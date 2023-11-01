using System.ComponentModel.DataAnnotations;
using CraftyCorner.Models;

namespace CraftyCorner.Models;
public class EventDTO
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public int UserProfileId { get; set; }
    public UserProfile? UserProfile { get; set; }
    public DateTime DateTime { get; set; }
    [Required]
    public string Duration { get; set; }
    public decimal? Cost { get; set; }
    [Required]
    public string Address { get; set; }
    [Required]
    public string Body { get; set; }
    public string PictureUrl { get; set; }
    public int TotalSeats { get; set; }
    public List<Rsvp> Rsvps { get; set; }
    public int SeatsAvailable
    {
        get
        {
            int seats = 0;
            // Totalseats - number of RSVPs = SeatsAvailable
            seats = TotalSeats - Rsvps.Count();

            return seats;
        }
    }
}