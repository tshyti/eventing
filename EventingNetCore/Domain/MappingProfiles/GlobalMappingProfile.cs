using AutoMapper;
using Domain.DTOs;
using Domain.DTOs.User;
using Domain.Entities.Users;

namespace Domain.MappingProfiles
{
    public class GlobalMappingProfile: Profile
    {
        public GlobalMappingProfile()
        {
            CreateMap<PagedResultDTO<ApplicationUser>, PagedResultDTO<UserDTO>>();
        }
    }
}