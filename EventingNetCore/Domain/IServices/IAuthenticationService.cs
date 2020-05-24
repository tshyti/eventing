using System;
using System.Threading.Tasks;
using Domain.RequestModels;

namespace Domain.IServices
{
    public interface IAuthenticationService
    {
       Task<string> Register(CreateUserRequest email);
       Task<string> Login(string email);
    }
}