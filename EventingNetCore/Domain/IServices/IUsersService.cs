using System.Threading.Tasks;
using Domain.RequestModels;
using Domain.DTOs;
using Domain.DTOs.User;
using Domain.Entities.Users;
using Domain.RequestModels.User;

namespace Domain.IServices
{
    public interface IUsersService
    {
        Task<PagedResultDTO<UserDTO>> GetAllUsers(PaginationRequest request);
        Task<UserDTO> GetUserById(string id);
        Task<UserDTO> CreateUser(CreateUserDTO createUserDto);
        Task UpdateUser(string userId, UpdateUserDTO updateUserDto);
        Task DeleteUser(string id);
        Task<ApplicationUser> GetApplicationUserById(string id);
    }
}