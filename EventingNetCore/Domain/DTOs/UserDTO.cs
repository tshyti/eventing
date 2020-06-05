using System;

namespace Domain.DTOs
{
    public class UserDTO
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string OrganizationName { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}