using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EventPlanner.Models
{
    public class Event
    {
        [Key]
        public int EventId {get;set;}
        [Required(ErrorMessage = "Reqired")]
        [MinLength(5, ErrorMessage = "Must Be 5 Characters or Longer")]
        public string Title {get;set;}
        [Required(ErrorMessage = "Reqired")]
        [Display(Name = "Date and Time")]
        public DateTime EventDT {get;set;}
        [Range(0, Int32.MaxValue, ErrorMessage = "must be greater than 0")]
        [Required(ErrorMessage = "Reqired")]
        public int Duration {get;set;}
        [Required(ErrorMessage = "Reqired")]
        public string DurationType {get;set;}
        [Required(ErrorMessage = "Reqired")]
        [MinLength(20, ErrorMessage = "Must Be 20 Characters or Longer")]
        public string Description {get;set;}

        public DateTime CreatedAt {get;set;} = DateTime.Now;
        public DateTime UpdatedAt {get;set;} = DateTime.Now;

        public int UserId { get; set;}
        public User Coordinater { get; set;}
        public List<Participant> Participants {get;set;}
    }
}
