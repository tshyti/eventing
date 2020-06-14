using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Helpers;
using Domain.DTOs.Events;
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

        [HttpPost]
        [Authorize(Roles = "Event Creator")]
        public async Task<IActionResult> Post([FromBody] CreateEventDTO createEventDto)
        {
            var userId = HttpRequestHelper.GetUserId(HttpContext);
            var createdEvent = await _eventsService.CreateEvent(createEventDto, userId);
            return Ok(createdEvent);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Event Creator")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateEventDTO updateEventDto)
        {
            var userId = HttpRequestHelper.GetUserId(HttpContext);
            await _eventsService.UpdateEvent(updateEventDto, id, userId);
            return Ok();
        }
    }
}