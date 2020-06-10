using FluentValidation;

namespace Domain.RequestModels
{
    public class PaginationRequest
    {
        private int _pageNumber;
        private int _pageSize;
        
        public int PageNumber
        {
            get => _pageNumber;
            set
            {
                if (value < 1)
                {
                    _pageNumber = 1;
                }
                else
                {
                    _pageNumber = value;
                }
            }
        }

        public int PageSize
        {
            get => _pageSize;
            set 
            {
                if (value < 1)
                {
                    _pageSize = 1;
                }
                else if (value > 100)
                {
                    _pageSize = 100;
                }
                else
                {
                    _pageSize = value;
                }
            } 
        }
    }
}