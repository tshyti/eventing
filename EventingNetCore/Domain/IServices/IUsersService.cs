using System.Threading.Tasks;
using Domain.RequestModels;
using Domain.DTOs;

namespace Domain.IServices
{
    public interface IUsersService
    {
        Task<PagedResultDTO<UserDTO>> GetAllUsers(PaginationRequest request);
        Task<UserDTO> GetUserById(string id);
        Task CreateUser();
        Task DeleteUser();
        Task UpdateUser();
    }
}