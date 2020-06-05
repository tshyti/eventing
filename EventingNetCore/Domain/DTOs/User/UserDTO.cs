using System;

namespace Domain.DTOs.User
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string OrganizationName { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}