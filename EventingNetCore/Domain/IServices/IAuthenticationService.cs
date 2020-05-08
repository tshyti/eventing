using System;
using System.Threading.Tasks;

namespace Domain.IServices
{
    public interface IAuthenticationService
    {
       Task<string> Register(string email);
       Task<string> Login(string email);
    }
}