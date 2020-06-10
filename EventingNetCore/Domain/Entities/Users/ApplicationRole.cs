using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities.Users
{
    public class ApplicationRole : IdentityRole
    {
        public IEnumerable<ApplicationUserRole> UserRoles { get; set; }
    }
}