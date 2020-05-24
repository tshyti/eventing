using AutoMapper;
using Domain.Entities.Users;
using Domain.RequestModels;
using Microsoft.AspNetCore.Identity;

namespace Domain.MappingProfiles
{
    public class Authentication: Profile
    {
        public Authentication()
        {
            CreateMap<CreateUserRequest, ApplicationUser>();
        }
    }
}