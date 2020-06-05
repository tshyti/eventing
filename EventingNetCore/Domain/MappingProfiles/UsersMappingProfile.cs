using AutoMapper;
using Domain.DTOs;
using Domain.Entities.Users;
using Domain.RequestModels;

namespace Domain.MappingProfiles
{
    public class UsersMappingProfile: Profile
    {
        public UsersMappingProfile()
        {
            CreateMap<UserRegisterRequest, ApplicationUser>()
                .ForMember(dest => dest.UserName, o => o.MapFrom(src => src.Email));
            CreateMap<ApplicationUser, UserDTO>();
        }
    }
}