using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using CraftyCorner.Models;

public class Item
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string Manufacturer { get; set; }
    public string Notes { get; set; }
    public bool isActive { get; set; }
    public int CategoryId { get; set; }
    public Category? Category { get; set; }
    [Required]
    public string PictureUrl { get; set; }
    public int UserProfileId { get; set; }
    public UserProfile? UserProfile { get; set; }
}