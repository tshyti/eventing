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
                .ProjectTo<UserDTO>(_mapper.ConfigurationProvider).GetPaged<UserDTO>(request);
            return users;
        }

        public async Task<UserDTO> GetUserById(string id)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user is null)
            {
                throw new HttpResponseException
                {
                    Status = 404,
                    Value = "User not found!"
                };
            }
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
            await _authService.RegisterApplicationUser(userToSave, createUserDto.Password, roleInDb.Name);
            
            var createdUser = await _dbContext.Users.ProjectTo<UserDTO>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(u => u.Email == createUserDto.Email);
            return createdUser;
        }

        public async Task UpdateUser(string id, UpdateUserDTO updateUserDto)
        {
            var userInDb = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (userInDb is null)
            {
                throw new HttpResponseException
                {
                    Status = 404,
                    Value = "User not found!"
                };
            }

            _mapper.Map(updateUserDto, userInDb);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteUser(string id)
        {
            var userInDb = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (userInDb is null)
            {
                throw new HttpResponseException
                {
                    Status = 404,
                    Value = "User not found!"
                };
            }

            await _userManager.DeleteAsync(userInDb);
        }
    }
}