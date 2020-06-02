using System.Threading.Tasks;
using Domain.IServices;
using Domain.RequestModels;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController
    {
        private readonly IUsersService _usersService;
        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }
    }
}