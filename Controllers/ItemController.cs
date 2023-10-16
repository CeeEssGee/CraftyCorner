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
    [Authorize]
    public IActionResult GetItems()
    {
        return Ok(_dbContext.Items
        .Include(i => i.UserProfile)
        .Include(i => i.Picture)
        .Include(i => i.Category)
        .ToList());
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetItemById(int id)
    {
        Item item = _dbContext
            .Items
            .Include(i => i.Category)
            .Include(i => i.Picture)
            .Include(i => i.UserProfile)
            .SingleOrDefault(i => i.Id == id);

        if (item == null)
        {
            return NotFound();
        }

        return Ok(item);
    }
}