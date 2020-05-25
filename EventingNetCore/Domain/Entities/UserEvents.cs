using System;
using System.Collections.Generic;
using Domain.Entities.Users;

namespace Domain.Entities
{
    public partial class UserEvents
    {
        public string Userid { get; set; }
        public int Eventid { get; set; }

        public virtual Events Event { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
