using System;
using System.ComponentModel.DataAnnotations;

namespace EventPlanner.Models
{
    public class Participant
    {
        [Key]
        public int ParticipantId {get;set;}
        public int UserId { get; set;}
        public int EventId { get; set;}

        public User Attendee { get; set;}
        public Event Event {get;set;}
    }
}
