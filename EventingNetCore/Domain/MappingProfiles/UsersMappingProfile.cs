using AutoMapper;
using Domain.DTOs;
using Domain.DTOs.User;
using Domain.Entities.Users;
using Domain.RequestModels;
using Domain.RequestModels.User;

namespace Domain.MappingProfiles
{
    public class UsersMappingProfile: Profile
    {
        public UsersMappingProfile()
        {
            CreateMap<UserRegisterRequest, ApplicationUser>()
                .ForMember(dest => dest.UserName, o => o.MapFrom(src => src.Email));
            CreateMap<CreateUserDTO, ApplicationUser>()
                .ForMember(dest => dest.UserName, o => o.MapFrom(src => src.Email));
            CreateMap<ApplicationUser, UserDTO>();
            CreateMap<UpdateUserDTO, ApplicationUser>();
        }
    }
}