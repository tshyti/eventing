using System.Threading.Tasks;
using API.Helpers;
using Domain.IServices;
using Domain.RequestModels;
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

        [HttpGet]
        public async Task<IActionResult> GetUserEvents([FromQuery]PaginationRequest request)
        {
            var events = await _eventsService.
                GetUserEvents(request, HttpRequestHelper.GetUserId(HttpContext));
            return Ok(events);
        }
    }
}