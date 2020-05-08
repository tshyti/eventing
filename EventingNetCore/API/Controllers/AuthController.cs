using System.Threading.Tasks;
using Domain.IServices;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController: ControllerBase
    {
        private readonly IAuthenticationService _authService;
        public AuthController(IAuthenticationService authenticationService)
        {
            _authService = authenticationService;
        }
        
        [Route("Register")]
        public async Task<IActionResult> Register()
        {
            var message = await _authService.Register("test@test.com");
            return Ok(message);
        }

        [Route("Login")]
        public async Task<IActionResult> Login()
        {
            var message = await _authService.Login("test@test.com");
            return Ok(message);
        }
    }
}