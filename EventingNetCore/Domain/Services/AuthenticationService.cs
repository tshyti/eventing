using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Common;
using Common.Config;
using Common.Exceptions;
using Domain.Entities.Users;
using Domain.IServices;
using Domain.RequestModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Domain.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly JwtBearerTokenSettings _jwtBearerTokenSettings;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly EventingContext _dbContext;
        private readonly IMapper _mapper;
        public AuthenticationService(
            IOptions<JwtBearerTokenSettings> jwtTokenOptions,
            UserManager<ApplicationUser> userManager,
            EventingContext dbContext,
            IMapper mapper)
        {
            _jwtBearerTokenSettings = jwtTokenOptions.Value;
            _userManager = userManager;
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task Register(CreateUserRequest user)
        {
            var applicationUser = _mapper.Map<ApplicationUser>(user);

            var createdUser = await _userManager.CreateAsync(applicationUser, user.Password);
            if (createdUser.Succeeded)
            {
                await _userManager.AddToRoleAsync(applicationUser, UserRoleNames.Common);
            }
            if (!createdUser.Succeeded)
            {
                throw new HttpResponseException { Status = 400, Value = createdUser.Errors };
            }
        }

        public async Task<string> Login(LoginRequest request)
        {
            var userInDb = await _userManager.FindByEmailAsync(request.Email);
            if (userInDb == null)
            {
                throw new HttpResponseException
                {
                    Status = 401,
                    Value = new
                    {
                        Email = "Email doesn't exist!"
                    }
                };
            }

            var verifyPassResult =
                _userManager.PasswordHasher.VerifyHashedPassword
                    (userInDb, userInDb.PasswordHash, request.Password);
            if (verifyPassResult != PasswordVerificationResult.Success)
            {
                throw new HttpResponseException
                {
                    Status = 401,
                    Value = new
                    {
                        Password = "Password is incorrect!"
                    }
                };
            }

            var userRoles = await _userManager.GetRolesAsync(userInDb);
            return GenerateJwtToken(userInDb, userRoles[0]);
        }

        private string GenerateJwtToken(ApplicationUser user, string roleName)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var secret = Encoding.ASCII.GetBytes(_jwtBearerTokenSettings.SecretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Firstname),
                    new Claim(ClaimTypes.Surname, user.Lastname),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, roleName),
                }),
                Expires = DateTime.UtcNow.AddSeconds(_jwtBearerTokenSettings.ExpiryTimeInSeconds),
                SigningCredentials = new SigningCredentials
                    (new SymmetricSecurityKey(secret), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _jwtBearerTokenSettings.Issuer
            };

            var jwtToken = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(jwtToken);
        }
    }
}