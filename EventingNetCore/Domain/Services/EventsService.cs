using System.Threading.Tasks;
using AutoMapper;
using Domain.DTOs;
using Domain.DTOs.Events;
using Domain.IServices;
using Domain.RequestModels;

namespace Domain.Services
{
    public class EventsService: IEventsService
    {
        private readonly EventingContext _dbContext;
        private readonly IMapper _mapper;
        
        public EventsService(
            EventingContext dbContext, 
            IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public Task<PagedResultDTO<EventDTO>> GetEventsOfUser(PaginationRequest request, string userId)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedResultDTO<EventDTO>> GetAllEvents(PaginationRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<EventDTO> GetEventById(int eventId)
        {
            throw new System.NotImplementedException();
        }

        public Task<EventDTO> CreateEvent(CreateEventDTO createEventDto, string userId)
        {
            throw new System.NotImplementedException();
        }

        public Task UpdateEvent(UpdateEventDTO updateEventDto, string userId)
        {
            throw new System.NotImplementedException();
        }

        public Task DeleteEvent(int eventId, string userId)
        {
            throw new System.NotImplementedException();
        }
    }
}