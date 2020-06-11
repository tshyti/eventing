using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTOs;
using Domain.DTOs.Events;
using Domain.Entities;
using Domain.Helpers;
using Domain.IServices;
using Domain.RequestModels;
using Microsoft.EntityFrameworkCore;

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

        // TODO: query events by userId
        public async Task<PagedResultDTO<EventDTO>> GetUserEvents(PaginationRequest request, string userId)
        {
            var events = await _dbContext.Events
                .Include(e => e.ApplicationUser)
                .Include(e => e.EventTags)
                .ThenInclude(e => e.Tag)
                .ProjectTo<EventDTO>(_mapper.ConfigurationProvider)
                .GetPagedAsync(request);
            return events;
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