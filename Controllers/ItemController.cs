using CraftyCorner.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CraftyCorner.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemController : ControllerBase
{
    private CraftyCornerDbContext _dbContext;

    public ItemController(CraftyCornerDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult GetItems()
    {
        return Ok(_dbContext.Items
        .Include(i => i.UserProfile)
        .Include(i => i.Category)
        .ToList()
        );
    }

    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetItemById(int id)
    {
        Item item = _dbContext
            .Items
            .Include(i => i.Category)
            .Include(i => i.UserProfile)
            .Include(i => i.ItemComments)
            .SingleOrDefault(i => i.Id == id);

        if (item == null)
        {
            return NotFound();
        }

        return Ok(item);
    }

    [HttpPost]
    // [Authorize]
    public IActionResult CreateItem(Item item)
    {
        item.UserProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == item.UserProfileId);
        _dbContext.Items.Add(item);
        _dbContext.SaveChanges();
        return Created($"api/item/{item.Id}", item);
    }

    [HttpDelete("{id}")]
    // [Authorize]
    public IActionResult DeleteItem(int id)
    {
        Item itemToDelete = _dbContext.Items.SingleOrDefault(i => i.Id == id);

        if (itemToDelete != null)
        {
            _dbContext.Items.Remove(itemToDelete);
            _dbContext.SaveChanges();
            return NoContent();
        }
        return NotFound();
    }
}