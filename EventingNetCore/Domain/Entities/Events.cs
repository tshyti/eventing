using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public partial class Events
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public decimal Price { get; set; }
    }
}
