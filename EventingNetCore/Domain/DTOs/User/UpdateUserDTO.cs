using FluentValidation;

namespace Domain.DTOs.User
{
    public class UpdateUserDTO
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string OrganizationName { get; set; }
    }

    public class UpdateUserDtoValidator : AbstractValidator<UpdateUserDTO>
    {
        public UpdateUserDtoValidator()
        {
            RuleFor(m => m.Firstname).NotEmpty().NotNull().MinimumLength(2);
            RuleFor(m => m.Lastname).NotEmpty().NotNull().MinimumLength(2);
            RuleFor(m => m.OrganizationName).NotEmpty().NotNull().MinimumLength(2);
        }
    }
}