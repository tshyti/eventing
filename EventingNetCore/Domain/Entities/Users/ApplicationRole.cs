using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities.Users
{
    public class ApplicationRole : IdentityRole
    {
        public ICollection<ApplicationUserRole> UserRoles { get; set; }
    }
}