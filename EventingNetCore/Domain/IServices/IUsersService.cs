using System.Threading.Tasks;
using Domain.RequestModels;
using Domain.DTOs;
using Domain.DTOs.User;

namespace Domain.IServices
{
    public interface IUsersService
    {
        Task<PagedResultDTO<UserDTO>> GetAllUsers(PaginationRequest request);
        Task<UserDTO> GetUserById(string id);
        Task UpdateUser(string userId, UpdateUserDTO updateUserDto);
        Task DeleteUser(string id);
        Task CreateUser();
    }
}