using System;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities.Users
{
    public class ApplicationUser: IdentityUser
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string OrganizationName { get; set; }
        public DateTime? CreatedOn { get; set; }
    }
}