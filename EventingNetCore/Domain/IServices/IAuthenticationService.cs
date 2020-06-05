using System;
using System.Threading.Tasks;
using Domain.RequestModels;
using Domain.RequestModels.User;

namespace Domain.IServices
{
    public interface IAuthenticationService
    {
        Task Register(UserRegisterRequest user);
        Task<string> Login(LoginRequest request);
    }
}