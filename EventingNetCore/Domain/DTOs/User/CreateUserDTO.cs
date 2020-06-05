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
            Include(new UserRegisterRequestValidator());
            RuleFor(m => m.RoleId).NotEmpty().NotNull();
            RuleFor(m => m.OrganizationName).NotEmpty().NotNull();
        }
    }
}