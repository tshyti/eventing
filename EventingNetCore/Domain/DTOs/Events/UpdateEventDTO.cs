using System;
using System.Collections.Generic;
using FluentValidation;

namespace Domain.DTOs.Events
{
    public class UpdateEventDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<int> TagIDs { get; set; }
    }

    public class UpdateEventDTOValidator : AbstractValidator<UpdateEventDTO>
    {
        public UpdateEventDTOValidator()
        {
            RuleFor(m => m.Name).NotNull().NotEmpty().MinimumLength(2);
            RuleFor(m => m.Description).NotNull().NotEmpty().MinimumLength(5);
            RuleFor(m => m.TagIDs)
                .Must(t => t.Count > 0)
                .WithMessage("Event must have at least one tag");
        }
    }
}