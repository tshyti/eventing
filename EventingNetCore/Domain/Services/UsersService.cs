using System.Threading.Tasks;
using Domain.DTOs;
using Domain.IServices;
using Domain.RequestModels;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Exceptions;
using Domain.DTOs.User;
using Microsoft.EntityFrameworkCore;
using Domain.Helpers;
using Domain.Entities.Users;
using Microsoft.AspNetCore.Identity;

namespace Domain.Services
{
    public class UsersService : IUsersService
    {
        private readonly EventingContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public UsersService(
            EventingContext dbContext,
            UserManager<ApplicationUser> userManager,
            IMapper mapper)
        {
            _dbContext = dbContext;
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
        
        public async Task CreateUser()
        {
            throw new System.NotImplementedException();
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