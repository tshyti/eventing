using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Domain
{
    public partial class EventingContext : IdentityDbContext
    {
        public EventingContext()
        {
        }

        public EventingContext(DbContextOptions<EventingContext> options)
            : base(options)
        {
        }
    }
}
