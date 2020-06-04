using System.Threading.Tasks;
using Domain.DTOs;
using Domain.IServices;
using Domain.RequestModels;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Domain.Helpers;
using Domain.Entities.Users;

namespace Domain.Services
{
    public class UsersService : IUsersService
    {
        private readonly EventingContext _dbContext;

        public UsersService(EventingContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateUser()
        {
            throw new System.NotImplementedException();
        }

        public async Task DeleteUser()
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedResultDTO<UserDTO>> GetAllUsers(PaginationRequest request)
        {
            var users = await _dbContext.Users.GetPaged<ApplicationUser>(request);
            return new PagedResultDTO<UserDTO>();
        }

        public async Task GetUserById()
        {
            throw new System.NotImplementedException();
        }

        public async Task UpdateUser()
        {
            throw new System.NotImplementedException();
        }
    }
}