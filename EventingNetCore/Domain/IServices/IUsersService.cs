using System.Threading.Tasks;
using Domain.RequestModels;

namespace Domain.IServices
{
    public interface IUsersService
    {
        Task GetAllUsers(PaginationRequest request);
        Task GetUserById();
        Task CreateUser();
        Task DeleteUser();
        Task UpdateUser();
    }
}