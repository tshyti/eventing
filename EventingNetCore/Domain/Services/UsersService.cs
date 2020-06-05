using System.Threading.Tasks;
using Domain.DTOs;
using Domain.IServices;
using Domain.RequestModels;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Domain.Helpers;
using Domain.Entities.Users;

namespace Domain.Services
{
    public class UsersService : IUsersService
    {
        private readonly EventingContext _dbContext;
        private readonly IMapper _mapper;

        public UsersService(
            EventingContext dbContext,
            IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
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
            var users = await _dbContext.Users.ProjectTo<UserDTO>(_mapper.ConfigurationProvider).GetPaged<UserDTO>(request);
            return users;
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