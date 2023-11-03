using CraftyCorner.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CraftyCorner.Models;

namespace CraftyCorner.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private CraftyCornerDbContext _dbContext;

    public CategoryController(CraftyCornerDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetCategories()
    {
        return Ok(_dbContext.Categories
        .OrderBy(c => c.Name)
        );
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetCategoryById(int id)
    {
        Category category = _dbContext
            .Categories
            .SingleOrDefault(c => c.Id == id);

        if (category == null)
        {
            return NotFound();
        }

        return Ok(category);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult CreateCategory(Category category)
    {
        try
        {
            _dbContext.Categories.Add(category);
            _dbContext.SaveChanges();
            return Created($"/api/category/{category.Id}", category);
        }
        catch (DbUpdateException)
        {
            return NotFound();
        }
    }

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult UpdateCategory(Category category, int id)
    {
        Category categoryToUpdate = _dbContext.Categories.SingleOrDefault(c => c.Id == id);
        if (categoryToUpdate == null)
        {
            return NotFound();
        }
        else if (id != category.Id)
        {
            return BadRequest();
        }
        categoryToUpdate.Name = category.Name;

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult DeleteCategory(int id)
    {
        Category categoryToDelete = _dbContext.Categories.SingleOrDefault(c => c.Id == id);

        if (categoryToDelete == null)
        {
            return NotFound();
        }

        _dbContext.Categories.Remove(categoryToDelete);

        _dbContext.Items
            .Where(i => i.CategoryId == categoryToDelete.Id).ToList()
            .ForEach(i => i.CategoryId = 9); // reassinging to "Other"

        _dbContext.SaveChanges();
        return NoContent();
    }
}