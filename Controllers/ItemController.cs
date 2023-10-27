using System.Net.NetworkInformation;
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
        .OrderBy(i => i.Manufacturer)
        .Where(i => i.isActive == true)
        .ToList()
        );
    }

    [HttpGet("{userId}/userId")]
    // [Authorize]
    public IActionResult GetItemsByUserId(int userId)
    {
        return Ok(_dbContext.Items
        .Include(i => i.UserProfile)
        .Include(i => i.Category)
        .OrderBy(i => i.Manufacturer)
        .Where(i => i.UserProfileId == userId)
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

    [HttpPut("{id}/edit")]
    // [Authorize]
    public IActionResult UpdateItem(int id, Item item)
    {
        Item itemToUpdate = _dbContext.Items.SingleOrDefault(i => i.Id == id);

        if (itemToUpdate == null)
        {
            return NotFound();
        }
        if (id != itemToUpdate.Id)
        {
            return BadRequest();
        }

        itemToUpdate.Name = item.Name;
        itemToUpdate.Manufacturer = item.Manufacturer;
        itemToUpdate.Notes = item.Notes;
        itemToUpdate.isActive = true;
        itemToUpdate.CategoryId = item.CategoryId;
        itemToUpdate.PictureUrl = item.PictureUrl;
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPut("{id}/deactivate")]
    // [Authorize]
    public IActionResult DeactivateItem(int id)
    {
        Item itemToDeactivate = _dbContext.Items.SingleOrDefault(i => i.Id == id);

        if (itemToDeactivate == null)
        {
            return NotFound();
        }
        if (id != itemToDeactivate.Id)
        {
            return BadRequest();
        }

        itemToDeactivate.isActive = false;
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPut("{id}/reactivate")]
    // [Authorize]
    public IActionResult ReactivateItem(int id)
    {
        Item itemToReactivate = _dbContext.Items.SingleOrDefault(i => i.Id == id);

        if (itemToReactivate == null)
        {
            return NotFound();
        }
        if (id != itemToReactivate.Id)
        {
            return BadRequest();
        }

        itemToReactivate.isActive = true;
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpGet("borrowed/{userId}")]
    // [Authorize]
    public IActionResult BorrowedItems(int userId)
    {
        List<Item> foundItems =
        _dbContext.ItemComments
        .Include(ic => ic.Item)
        .ThenInclude(i => i.UserProfile)
        .OrderBy(ic => ic.Date)
        .Where(ic => ic.UserProfileId == userId && ic.BorrowRequest == true)
        .Select(ic => ic.Item)
        .Distinct()
        .ToList();

        return Ok(foundItems);

    }

}