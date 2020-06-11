using System;
using System.Collections.Generic;
using Domain.DTOs.Tags;
using Domain.Entities;

namespace Domain.DTOs.Events
{
    public class EventDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public List<TagDTO> Tags { get; set; }
    }
}