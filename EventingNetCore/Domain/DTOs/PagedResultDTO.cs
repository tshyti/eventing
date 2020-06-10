using System.Collections.Generic;
using System;
using Domain.RequestModels;

namespace Domain.DTOs
{
    public class PagedResultDTO<T> : PaginationRequest
    {
        public int FirstIndex
        {
            get { return (PageNumber - 1) * PageSize + 1; }
        }
        public int LastIndex
        {
            get { return Math.Min(PageNumber * PageSize, MaxItems); }
        }
        public int MaxItems { get; set; }
        public int PageCount { get; set; }
        public IList<T> Result { get; set; }
    }
}