using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public partial class EventTags
    {
        public int Eventid { get; set; }
        public int Tagid { get; set; }

        public virtual Events Event { get; set; }
        public virtual Tags Tag { get; set; }
    }
}
