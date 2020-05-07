using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public partial class TestType
    {
        public TestType()
        {
            Test = new HashSet<Test>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Test> Test { get; set; }
    }
}
