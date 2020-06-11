using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public partial class Tags
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedOn { get; set; }
        public virtual ICollection<EventTags> EventTags { get; set; }
    }
}
