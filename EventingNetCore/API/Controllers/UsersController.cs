using System.Threading.Tasks;
using Domain.DTOs.User;
using Domain.IServices;
using Domain.RequestModels;
using Domain.RequestModels.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin" )]
    public class UsersController: ControllerBase
    {
        private readonly IUsersService _usersService;
        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationRequest request)
        {
            var users = await _usersService.GetAllUsers(request);
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var user = await _usersService.GetUserById(id);
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] UpdateUserDTO user)
        {
            await _usersService.UpdateUser(id, user);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _usersService.DeleteUser(id);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateUserDTO createUserDto)
        {
            var user = await _usersService.CreateUser(createUserDto);
            return Ok(user);
        }

        [HttpGet("getroles")]
        public async Task<IActionResult> GetRoles()
        {
            var userRoles = await _usersService.GetAvailableUserRoles();
            return Ok(userRoles);
        }
    }
}