using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.DTOs;
using Domain.IServices;
using Domain.RequestModels;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common;
using Common.Exceptions;
using Domain.DTOs.User;
using Microsoft.EntityFrameworkCore;
using Domain.Helpers;
using Domain.Entities.Users;
using Domain.RequestModels.User;
using Microsoft.AspNetCore.Identity;

namespace Domain.Services
{
    public class UsersService : IUsersService
    {
        private readonly EventingContext _dbContext;
        private readonly IAuthenticationService _authService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public UsersService(
            EventingContext dbContext,
            UserManager<ApplicationUser> userManager,
            IAuthenticationService authService,
            IMapper mapper)
        {
            _dbContext = dbContext;
            _authService = authService;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<PagedResultDTO<UserDTO>> GetAllUsers(PaginationRequest request)
        {
            var users = await _dbContext.Users
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .GetPagedAsync(request);
            return _mapper.Map<PagedResultDTO<ApplicationUser>, PagedResultDTO<UserDTO>>(users);
        }

        public async Task<UserDTO> GetUserById(string id)
        {
            var user = await GetApplicationUserById(id);
            return _mapper.Map<ApplicationUser, UserDTO>(user);
        }

        public async Task<UserDTO> CreateUser(CreateUserDTO createUserDto)
        {
            var roleInDb = await _dbContext.Roles.FirstOrDefaultAsync(r => r.Id == createUserDto.RoleId);

            if (roleInDb is null)
            {
                throw new HttpResponseException
                {
                    Status = 404,
                    Value = "Role not found!"
                };
            }

            var userToSave = _mapper.Map<ApplicationUser>(createUserDto);
            var randomPassword = PasswordGenerator.GenerateRandomPassword();
            await _authService.RegisterApplicationUser(userToSave, randomPassword, roleInDb.NormalizedName);

            var createdUser = await _dbContext.Users
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .ProjectTo<UserDTO>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(u => u.Email == createUserDto.Email);
            return createdUser;
        }

        public async Task UpdateUser(string id, UpdateUserDTO updateUserDto)
        {
            var userInDb = await GetApplicationUserById(id);

            _mapper.Map(updateUserDto, userInDb);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteUser(string id)
        {

            var userInDb = await GetApplicationUserById(id);
            await _userManager.DeleteAsync(userInDb);
        }

        public async Task<ApplicationUser> GetApplicationUserById(string id)
        {
            var userInDb = await _dbContext.Users
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.Id == id);
            if (userInDb is null)
            {
                throw new HttpResponseException
                {
                    Status = 404,
                    Value = "User not found!"
                };
            }

            return userInDb;
        }

        public async Task<IList<RoleDTO>> GetAvailableUserRoles()
        {
            var userRoles = await _dbContext.Roles
                .Where(r => r.Name != UserRoleNames.Common)
                .ProjectTo<RoleDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return userRoles;
        }
    }
}