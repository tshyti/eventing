using System;
using System.Linq;
using System.Threading.Tasks;
using Domain.DTOs;
using Domain.RequestModels;

namespace Domain.ExtensionMethods
{
    public static class Pagination
    {
        public static int GetPageCount(int maxItems, int pageSize)
        {
            var pageCount = (double)maxItems / pageSize;
            return (int)Math.Ceiling(pageCount);
        }

        public static int GetSkipCount(int pageNumber, int pageSize)
        {
            return (pageNumber - 1) * pageSize;
        }
    }
}