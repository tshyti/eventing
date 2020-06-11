using System;
using System.Collections.Generic;
using Domain.Entities.Users;

namespace Domain.Entities
{
    public partial class Events
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
