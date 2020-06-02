using System;
using System.Threading.Tasks;
using Domain.RequestModels;

namespace Domain.IServices
{
    public interface IAuthenticationService
    {
        Task Register(UserRegisterRequest user);
        Task<string> Login(LoginRequest request);
    }
}