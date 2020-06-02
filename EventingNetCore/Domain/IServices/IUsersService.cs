using System.Threading.Tasks;
namespace Domain.IServices
{
    public interface IUsersService
    {
        Task GetAllUsers();
        Task GetUserById();
        Task CreateUser();
        Task DeleteUser();
        Task UpdateUser();
    }
}