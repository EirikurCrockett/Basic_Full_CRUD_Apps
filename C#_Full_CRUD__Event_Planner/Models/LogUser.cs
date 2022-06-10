using System;
using System.ComponentModel.DataAnnotations;

namespace EventPlanner.Models
{
    public class LogUser
    {

        [Required(ErrorMessage = "Invalid Email/Password")]
        [EmailAddress(ErrorMessage = "Invalid Email/Password")]
        [Display(Name = "Email")]
        public string LogEmail { get; set;}

        [Required(ErrorMessage = "Invalid Email/Password")]
        [DataType(DataType.Password, ErrorMessage = "Invalid Email/Password")]
        [Display(Name = "Password")]
        public string LogPassword { get; set;}
    }
}
