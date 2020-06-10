using System;
using System.Threading.Tasks;
using Common;
using Domain.Entities.Users;
using Domain.RequestModels;
using Domain.RequestModels.User;

namespace Domain.IServices
{
    public interface IAuthenticationService
    {
        Task Register(UserRegisterRequest user);
        Task RegisterApplicationUser(ApplicationUser applicationUser,
            string password, string roleName = UserRoleNames.Common);
        Task<string> Login(LoginRequest request);
    }
}