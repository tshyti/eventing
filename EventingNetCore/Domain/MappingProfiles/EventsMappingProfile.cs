using System.Linq;
using AutoMapper;
using Domain.DTOs.Events;
using Domain.DTOs.Tags;
using Domain.Entities;

namespace Domain.MappingProfiles
{
    public class EventsMappingProfile: Profile
    {
        public EventsMappingProfile()
        {
            CreateMap<Events, EventDTO>()
                .ForMember(d => d.Tags, o => o.MapFrom(src => src.EventTags.Select(x => x.Tag)))
                .ForMember(d => d.CreatedBy, o => o.MapFrom((src => src.ApplicationUser.OrganizationName)));
        }
    }
}