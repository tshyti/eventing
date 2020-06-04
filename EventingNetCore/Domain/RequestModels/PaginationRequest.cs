using FluentValidation;

namespace Domain.RequestModels
{
    public class PaginationRequest
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }

    public class PaginationRequestValidator : AbstractValidator<PaginationRequest>
    {
        public PaginationRequestValidator()
        {
            RuleFor(m => m.PageNumber).GreaterThan(0);
            RuleFor(m => m.PageSize).GreaterThan(0);
        }
    }
}