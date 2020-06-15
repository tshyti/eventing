using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public partial class EventTags: IEquatable<EventTags>
    {
        public int Eventid { get; set; }
        public int Tagid { get; set; }

        public virtual Events Event { get; set; }
        public virtual Tags Tag { get; set; }

        public bool Equals(EventTags other)
        {
            if (other is null)
            {
                return false;
            }

            return this.Tagid == other.Tagid;
        }

        public override bool Equals(object? obj)
        {
            return Equals(obj as EventTags);
        }

        public override int GetHashCode()
        {
            return this.Tagid.GetHashCode();
        }
    }
}
