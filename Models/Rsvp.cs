using System.ComponentModel.DataAnnotations;
using CraftyCorner.Models;

namespace CraftyCorner.Models;
public class Rsvp
{
    public int Id { get; set; }
    public int EventId { get; set; }
    public Event? Event { get; set; }
    public int UserProfileId { get; set; }
    public UserProfile? UserProfile { get; set; }
    public string RsvpNote { get; set; }
}