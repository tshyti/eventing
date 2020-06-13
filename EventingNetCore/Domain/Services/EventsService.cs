using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Exceptions;
using Domain.DTOs;
using Domain.DTOs.Events;
using Domain.Entities;
using Domain.Entities.Users;
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
        
        public async Task<PagedResultDTO<EventDTO>> GetUserEvents(PaginationRequest request, string userId)
        {
            var events = await _dbContext.Events
                .Include(e => e.ApplicationUser)
                .Include(e => e.EventTags)
                .ThenInclude(e => e.Tag)
                .Where(e => e.ApplicationUser.Id == userId)
                .ProjectTo<EventDTO>(_mapper.ConfigurationProvider)
                .GetPagedAsync(request);
            return events;
        }

        public async Task<PagedResultDTO<EventDTO>> GetAllEvents(PaginationRequest request)
        {
            var events = await _dbContext.Events
                .Include(e => e.ApplicationUser)
                .Include(e => e.EventTags)
                .ThenInclude(e => e.Tag)
                .ProjectTo<EventDTO>(_mapper.ConfigurationProvider)
                .GetPagedAsync(request);
            return events;
        }

        public async Task<EventDTO> GetEventById(int eventId)
        {
            var ev = await _dbContext.Events
                .Include(e => e.ApplicationUser)
                .Include(e => e.EventTags)
                .ThenInclude(e => e.Tag)
                .Where(e => e.Id == eventId)
                .ProjectTo<EventDTO>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
            return ev;
        }

        public async Task<EventDTO> CreateEvent(CreateEventDTO createEventDto, string userId)
        {
            var eventToCreate = _mapper.Map<Events>(createEventDto);
            eventToCreate.CreatedBy = userId;
            try
            {
                await _dbContext.Events.AddAsync(eventToCreate);

                var eventTagsToCreate = _mapper.Map<List<EventTags>>(createEventDto.TagIDs);
                eventTagsToCreate.ForEach(e => e.Event = eventToCreate);
                await _dbContext.EventTags.AddRangeAsync(eventTagsToCreate);

                await _dbContext.SaveChangesAsync();
                return await GetEventById(eventToCreate.Id);
            }
            catch (Exception e)
            {
                throw new HttpResponseException
                {
                    Status = 404,
                    Value = "Some sent data could not be found"
                };
            }
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