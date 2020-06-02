using System.Threading.Tasks;
using Domain.IServices;

namespace Domain.Services
{
    public class UsersService : IUsersService
    {
        Task IUsersService.CreateUser()
        {
            throw new System.NotImplementedException();
        }

        Task IUsersService.DeleteUser()
        {
            throw new System.NotImplementedException();
        }

        Task IUsersService.GetAllUsers()
        {
            throw new System.NotImplementedException();
        }

        Task IUsersService.GetUserById()
        {
            throw new System.NotImplementedException();
        }

        Task IUsersService.UpdateUser()
        {
            throw new System.NotImplementedException();
        }
    }
}