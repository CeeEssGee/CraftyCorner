using CraftyCorner.Data;
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
    // [Authorize]
    public IActionResult GetItemComments()
    {
        return Ok(_dbContext.ItemComments
        .Include(ic => ic.UserProfile)
        .Include(ic => ic.Item)
        .OrderBy(ic => ic.Date)
        .ToList()
        );
    }

}