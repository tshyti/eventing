using System.Threading.Tasks;
using Domain.IServices;
using Domain.RequestModels;
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
        
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody]CreateUserRequest request)
        {
            await _authService.Register(request);
            return Ok();
        }

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login()
        {
            var message = await _authService.Login("test@test.com");
            return Ok(message);
        }
    }
}