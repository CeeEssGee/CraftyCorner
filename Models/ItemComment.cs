using System.ComponentModel.DataAnnotations;
using CraftyCorner.Models;

namespace CraftyCorner.Models;
public class ItemComment
{
    public int Id { get; set; }
    public int ItemId { get; set; }
    public Item? Item { get; set; }
    public int UserProfileId { get; set; }
    public UserProfile? UserProfile { get; set; }
    public DateTime Date { get; set; }
    [Required]
    public string Body { get; set; }
    public string? PictureUrl { get; set; }
    public bool BorrowRequest { get; set; }
}