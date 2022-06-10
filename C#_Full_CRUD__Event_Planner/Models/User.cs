using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPlanner.Models
{
    public class User
    {
        [Key]
        public int UserId {get; set;}

        [Required(ErrorMessage = "Name Is Required")]
        [MinLength(2, ErrorMessage = "Name Must Contain At Least 2 Characters")]
        [Display(Name= "Name")]
        public string Name { get; set;}

        [Required(ErrorMessage = "Email Is Required")]
        [EmailAddress(ErrorMessage = "Please Enter A Valid Email")]
        public string Email { get; set;}

        [Required(ErrorMessage = "Password Is Required")]
        [MinLength(8, ErrorMessage = "Password Must Contain At Least 8 Characters")]
        [DataType(DataType.Password, ErrorMessage = "Please Enter A Valid Password")]
        public string Password { get; set;}

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        [NotMapped]
        [Required(ErrorMessage = "Please Confirm Password")]
        [DataType(DataType.Password, ErrorMessage = "Please Enter A Valid Password")]
        [Compare("Password", ErrorMessage = "Passwords Must Match")]
        [Display(Name= "Confirm Password")]
        public string ConfirmPassword { get; set;}

        public List<Event> CreatedEvents { get; set;}
        public List<Participant> Attending {get;set;}

    }
}
