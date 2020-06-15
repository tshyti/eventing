using System.Linq;
using AutoMapper;
using Domain.DTOs;
using Domain.DTOs.Tags;
using Domain.Entities;

namespace Domain.MappingProfiles
{
    public class TagsMappingProfile: Profile
    {
        public TagsMappingProfile()
        {
            CreateMap<Tags, TagDTO>();
            CreateMap<int, EventTags>().ConvertUsing(id => new EventTags{Tagid = id});
            CreateMap<EventTags, TagDTO>()
                .ForMember(d => d.Id, o => o.MapFrom(src => src.Tagid));
            CreateMap<EventTags, int>()
                .ConstructUsing(u => u.Tagid);
        }
    }
}