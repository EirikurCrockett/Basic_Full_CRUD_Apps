using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using EventPlanner.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;

namespace EventPlanner.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private MyContext _context;

        public HomeController(ILogger<HomeController> logger, MyContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("")]
        public IActionResult Index()
        {   
            if(HttpContext.Session.GetInt32("UserId") != null){
                return RedirectToAction("Dashboard");
            }
            return View("Index");
        }

        [HttpPost("check/reg")]
        public IActionResult Reg(User user)
        {
            if(ModelState.IsValid)
            {
                if(_context.Users.Any(u => u.Email == user.Email))
                {
                    ModelState.AddModelError("Email", "Email already in use!");
                    return View("Index");
                }
                else
                {

                    PasswordHasher<User> hasher = new PasswordHasher<User>();

                    user.Password = hasher.HashPassword(user, user.Password);

                    _context.Add(user);
                    _context.SaveChanges();

                    HttpContext.Session.SetInt32("UserId", user.UserId);

                    return RedirectToAction("Index");
                }
            }
            else
            {
                return View("Index");
            }
        }

        [HttpPost("check/login")]
        public IActionResult Login(LogUser logUser)
        {
            if(ModelState.IsValid)
            {
                User user = _context.Users
                    .FirstOrDefault(u => u.Email == logUser.LogEmail);
                if(user == null)
                {
                    ModelState.AddModelError("LogEmail", "Invalid Email/Password");
                    return View("Index");
                }
                
                PasswordHasher<LogUser> hasher = new PasswordHasher<LogUser>();
                var result = hasher.VerifyHashedPassword(logUser, user.Password, logUser.LogPassword);

                if(result == 0){
                    ModelState.AddModelError("LogEmail", "Invalid Email/Password");
                    return View("Index");
                }
                
                HttpContext.Session.SetInt32("UserId", user.UserId);
                HttpContext.Session.SetString("UserName", user.Name);
                
                return RedirectToAction("Index");
                
            }
            else
            {
                return View("Index");
            }
        }

        [HttpGet("logout")]
        public IActionResult Logout(){

            HttpContext.Session.Clear();
            return RedirectToAction("Index");
        }

        [HttpGet("meetups")]
        public IActionResult Meetups()
        {
            if(HttpContext.Session.GetInt32("UserId") == null){
                return RedirectToAction("Index");
            }

            ViewBag.UserId = HttpContext.Session.GetInt32("UserId");
            ViewBag.UserName = HttpContext.Session.GetInt32("UserName");
            ViewBag.Events = _context.Events
                .Include(meet => meet.Coordinater)
                .Include(part => part.Participants)
                .OrderBy(meet => meet.EventDT)
                .ToList();


            return View();
        }

        [HttpGet("meetups/new")]
        public IActionResult NewMeetup()
        {
            if(HttpContext.Session.GetInt32("UserId") == null){
                return RedirectToAction("Index");
            }

            ViewBag.UserId = HttpContext.Session.GetInt32("UserId");
            ViewBag.UserName = HttpContext.Session.GetInt32("UserName");
            return View();
        }

        [HttpPost("meetups/new/add")]
        public IActionResult AddMeetup(Event newEvent)
        {   
            if(HttpContext.Session.GetInt32("UserId") == null){
                return RedirectToAction("Index");
            }

            if(ModelState.IsValid)
            {
                if(DateTime.Compare(newEvent.EventDT, DateTime.Now) <= 0){
                    ModelState.AddModelError("EventDT", "Date and Time must be in the Future");
                    return View("NewMeetup");
                }
                else
                {
                    _context.Add(newEvent);
                    _context.SaveChanges();
                }
                
                return RedirectToAction("Meetups");
            }

            ViewBag.UserId = HttpContext.Session.GetInt32("UserId");
            ViewBag.UserName = HttpContext.Session.GetInt32("UserName");
            return View("NewMeetup");
        }

        [HttpGet("meetups/{eventId}")]
        public IActionResult OneMeetup(int eventId)
        {
            if(HttpContext.Session.GetInt32("UserId") == null){
                return RedirectToAction("Index");
            }

            ViewBag.UserId = HttpContext.Session.GetInt32("UserId");
            ViewBag.UserName = HttpContext.Session.GetInt32("UserName");
            ViewBag.Event = _context.Events
                .Include(meet => meet.Coordinater)
                .Include(meet => meet.Participants)
                    .ThenInclude(part => part.Attendee)
                .FirstOrDefault(meetup => meetup.EventId == eventId);

            return View();
        }
        [HttpGet("meetups/{eventId}/delete")]
        public IActionResult DeleteMeetup(int eventId)
        {
            Event RetrievedEvent = _context.Events
                .FirstOrDefault(meet => meet.EventId == eventId);
            _context.Events.Remove(RetrievedEvent);
            _context.SaveChanges();
            return RedirectToAction("Meetups");
        }
        [HttpPost("meetups/join")]
        public IActionResult JoinMeetup(Participant newPart)
        {   
            _context.Participants.Add(newPart);
            _context.SaveChanges();
            return Redirect($"{newPart.EventId}");
        }
        [HttpGet("meetups/{eventId}/leave")]
        public IActionResult LeaveMeetup(int eventId)
        {   
            Participant RetrievedPart = _context.Participants
                .Where(part => part.EventId == eventId)
                .FirstOrDefault(part => part.UserId == HttpContext.Session.GetInt32("UserId"));
                
            _context.Participants.Remove(RetrievedPart);
            _context.SaveChanges();
            
            return Redirect($"/meetups/{eventId}");
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
