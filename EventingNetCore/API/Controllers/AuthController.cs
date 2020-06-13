using System.Threading.Tasks;
using Domain.IServices;
using Domain.RequestModels;
using Domain.RequestModels.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _authService;
        public AuthController(IAuthenticationService authenticationService)
        {
            _authService = authenticationService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterRequest request)
        {
            await _authService.Register(request);
            return Ok();
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var message = await _authService.Login(request);
            return Ok(message);
        }
    }
}