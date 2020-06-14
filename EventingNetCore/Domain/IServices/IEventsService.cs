using System.Threading.Tasks;
using Domain.DTOs;
using Domain.DTOs.Events;
using Domain.Entities;
using Domain.RequestModels;

namespace Domain.IServices
{
    public interface IEventsService
    {
        Task<PagedResultDTO<EventDTO>> GetUserEvents(PaginationRequest request, string userId);
        Task<PagedResultDTO<EventDTO>> GetAllEvents(PaginationRequest request);
        Task<EventDTO> GetEventById(int eventId);
        Task<Events> GetEventByIdFromDb(int eventId);
        Task<EventDTO> CreateEvent(CreateEventDTO createEventDto, string userId);
        Task UpdateEvent(UpdateEventDTO updateEventDto, int eventId, string userId);
        Task DeleteEvent(int eventId, string userId);
    }
}