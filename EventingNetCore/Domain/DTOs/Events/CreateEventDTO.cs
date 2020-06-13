using System;
using System.Collections.Generic;
using FluentValidation;

namespace Domain.DTOs.Events
{
    public class CreateEventDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public decimal Price { get; set; }
        public DateTime Date { get; set; }

        public List<int> TagIDs { get; set; }
    }

    public class CreateEventDTOValidator: AbstractValidator<CreateEventDTO>
    {
        public CreateEventDTOValidator()
        {
            RuleFor(m => m.Name).NotNull().NotEmpty().MinimumLength(2);
            RuleFor(m => m.Description).NotNull().NotEmpty().MinimumLength(5);
            RuleFor(m => m.Location).NotNull().NotEmpty().MinimumLength(2);
            RuleFor(m => m.Price).NotNull().NotEmpty();
            RuleFor(m => m.Date).NotNull().NotEmpty()
                .Must(e => e > DateTime.Now.AddDays(1))
                .WithMessage("Event must be created at least one day in advance");
            RuleFor(m => m.TagIDs)
                .Must(t => t.Count > 0)
                .WithMessage("Event must have at least one tag");
        }
    }
}