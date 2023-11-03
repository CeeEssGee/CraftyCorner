using System.Net.NetworkInformation;
using CraftyCorner.Data;
using CraftyCorner.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CraftyCorner.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemCommentController : ControllerBase
{
    private CraftyCornerDbContext _dbContext;

    public ItemCommentController(CraftyCornerDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetItemCommentsByUserId()
    {
        List<ItemComment> foundItemComments =
        _dbContext.ItemComments
        .Include(ic => ic.UserProfile)
        .Include(ic => ic.Item)
        .ToList();

        return Ok(foundItemComments);
    }

    [HttpGet("{itemId}")]
    [Authorize]
    public IActionResult GetItemComments(int itemId)
    {
        List<ItemComment> foundItemComments =
        _dbContext.ItemComments
        .Include(ic => ic.UserProfile)
        .Include(ic => ic.Item)
        .OrderBy(ic => ic.Date)
        .Where(ic => ic.ItemId == itemId)
        .ToList();

        return Ok(foundItemComments);

    }

    [HttpPost]
    [Authorize]
    public IActionResult CreateComment(ItemComment itemComment)
    {
        itemComment.UserProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == itemComment.UserProfileId);
        itemComment.Date = DateTime.Now;
        _dbContext.ItemComments.Add(itemComment);
        _dbContext.SaveChanges();
        return Created($"api/itemComment/{itemComment.Id}", itemComment);
    }

}