using System;
using System.Linq;
using System.Threading.Tasks;
using Domain.DTOs;
using Domain.RequestModels;
using Microsoft.EntityFrameworkCore;

namespace Domain.Helpers
{
    public static class Pagination
    {
        public static async Task<PagedResultDTO<T>> GetPaged<T>(this IQueryable<T> query,
            PaginationRequest paging) where T: class
        {
            var pagedResult = new PagedResultDTO<T>
            {
                PageNumber = paging.PageNumber,
                PageSize = paging.PageSize
            };

            pagedResult.MaxItems = await query.CountAsync();
            pagedResult.PageCount = GetPageCount(paging, pagedResult.MaxItems);

            var skipCount = GetSkipCount(paging);
            pagedResult.Result = await query.Skip(skipCount).Take(paging.PageSize).ToListAsync();

            return pagedResult;
        }

        private static int GetPageCount(PaginationRequest paging, int maxItems)
        {
            var pageCount = (double)maxItems / paging.PageSize;
            return (int)Math.Ceiling(pageCount);
        }

        private static int GetSkipCount(PaginationRequest paging)
        {
            return (paging.PageNumber - 1) * paging.PageSize;
        }
    }
}