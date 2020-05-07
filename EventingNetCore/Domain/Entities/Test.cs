using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public partial class Test
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TestTypeId { get; set; }

        public virtual TestType TestType { get; set; }
    }
}
