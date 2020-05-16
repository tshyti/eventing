using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public partial class UserEvents
    {
        public string Userid { get; set; }
        public int Eventid { get; set; }

        public virtual Events Event { get; set; }
        public virtual AspNetUsers User { get; set; }
    }
}
