using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Common.Config;
using Domain.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Domain.Services
{
    public class AuthenticationService: IAuthenticationService
    {
        private readonly JwtBearerTokenSettings _jwtBearerTokenSettings;
        private readonly UserManager<IdentityUser> _userManager;
        public AuthenticationService(IOptions<JwtBearerTokenSettings> jwtTokenOptions, UserManager<IdentityUser> userManager)
        {
            _jwtBearerTokenSettings = jwtTokenOptions.Value;
            _userManager = userManager;
        }
        
        public async Task<string> Register(string email)
        {
            var identityUser = new IdentityUser
            {
                Email = email,
                UserName = "test1",
                
            };
            
            var createdUser = await _userManager.CreateAsync(identityUser, "TestPassword1.");
            return createdUser.Succeeded ? "great" : "not great";
        }

        public async Task<string> Login(string email)
        {
            var userInDb = await _userManager.FindByEmailAsync(email);
            if (userInDb == null) return null;
            var verifyPassResult =
                _userManager.PasswordHasher.VerifyHashedPassword
                    (userInDb, userInDb.PasswordHash, "TestPassword1.");
            if (verifyPassResult == PasswordVerificationResult.Success)
            {
                // add roles when registering 
                var userRoles = await _userManager.GetRolesAsync(userInDb);
                return GenerateJwtToken(userInDb);
            }
            
            return null;
        }

        private string GenerateJwtToken(IdentityUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var secret = Encoding.ASCII.GetBytes(_jwtBearerTokenSettings.SecretKey);
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email), 
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