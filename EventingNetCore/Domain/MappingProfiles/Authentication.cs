using AutoMapper;
using Domain.Entities.Users;
using Domain.RequestModels;
using Microsoft.AspNetCore.Identity;

namespace Domain.MappingProfiles
{
    public class Authentication : Profile
    {
        public Authentication()
        {
            CreateMap<UserRegisterRequest, ApplicationUser>()
                .ForMember(dest => dest.UserName, o => o.MapFrom(src => src.Email));
        }
    }
}