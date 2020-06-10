using System.Text.RegularExpressions;
using Domain.RequestModels.User;
using FluentValidation;

namespace Domain.DTOs.User
{
    public class CreateUserDTO: UserRegisterRequest
    {
        public string RoleId { get; set; }
        public string OrganizationName { get; set; }
    }

    public class CreateUserDTOValidator : AbstractValidator<CreateUserDTO>
    {
        public CreateUserDTOValidator()
        {
            RuleFor(m => m.Firstname).NotEmpty().NotNull().MinimumLength(2);
            RuleFor(m => m.Lastname).NotEmpty().NotNull().MinimumLength(2);
            RuleFor(m => m.Email).NotEmpty().NotNull().EmailAddress();
            RuleFor(m => m.RoleId).NotEmpty().NotNull();
            RuleFor(m => m.OrganizationName).NotEmpty().NotNull();
        }
    }
}