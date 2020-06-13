using System.Threading.Tasks;
using API.Helpers;
using Domain.IServices;
using Domain.RequestModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController: ControllerBase
    {
        private readonly IEventsService _eventsService;
        
        public EventsController(IEventsService eventsService)
        {
            _eventsService = eventsService;
        }

        [HttpGet("getusersevents/{userId}")]
        public async Task<IActionResult> GetUserEvents(string userId, [FromQuery]PaginationRequest request)
        {
            var events = await _eventsService.
                GetUserEvents(request, userId);
            return Ok(events);
        }
    }
}