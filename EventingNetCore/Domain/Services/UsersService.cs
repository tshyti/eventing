using System.Threading.Tasks;
using Domain.IServices;
using Domain.RequestModels;

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

        public async Task GetAllUsers(PaginationRequest request)
        {
            throw new System.NotImplementedException();
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