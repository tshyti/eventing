using System.Linq;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain.Helpers
{
    public static class EventsQueryHelper
    {
        public static IQueryable<Events> GetEventsWithJoinedData(this IQueryable<Events> query)
        {
            return query.Include(e => e.ApplicationUser)
                .Include(e => e.EventTags)
                .ThenInclude(e => e.Tag);
        }
    }
}