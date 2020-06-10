using System.Text.RegularExpressions;
using FluentValidation;

namespace Domain.RequestModels.User
{
    public class UserRegisterRequest
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class UserRegisterRequestValidator : AbstractValidator<UserRegisterRequest>
    {
        public UserRegisterRequestValidator()
        {
            RuleFor(m => m.Firstname).NotEmpty().NotNull().MinimumLength(2);
            RuleFor(m => m.Lastname).NotEmpty().NotNull().MinimumLength(2);
            RuleFor(m => m.Email).NotEmpty().NotNull().EmailAddress();
            RuleFor(m => m.Password)
                .NotEmpty()
                .NotNull()
                .MinimumLength(6)
                .Must(v => Regex.IsMatch(v, "(?=.*[a-z])"))
                .WithMessage("Password should have at least one lowercase character.")
                .Must(v => Regex.IsMatch(v, "(?=.*[A-Z])"))
                .WithMessage("Password should have at least one uppercase character")
                .Must(v => Regex.IsMatch(v, @"(?=.*\d)"))
                .WithMessage("Password should have at least one number");
        }
    }
}