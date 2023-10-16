using System.ComponentModel.DataAnnotations;
using CraftyCorner.Models;

public class Picture
{
    public int Id { get; set; }
    [Required]
    public string Url { get; set; }
}