using CraftyCorner.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CraftyCorner.Models;

namespace CraftyCorner.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RsvpController : ControllerBase
{
    private CraftyCornerDbContext _dbContext;

    public RsvpController(CraftyCornerDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetRsvps()
    {
        return Ok(_dbContext.Rsvps
        .Include(r => r.Event)
        .ThenInclude(e => e.UserProfile)
        .Include(r => r.UserProfile)
        .ToList()
        );
    }

    [HttpGet("{userId}/userId")]
    [Authorize]
    public IActionResult GetRsvpsByUserId(int userId)
    {
        return Ok(_dbContext.Rsvps
        .Include(r => r.Event)
        .ThenInclude(e => e.UserProfile)
        .Include(r => r.UserProfile)
        .Where(r => r.UserProfileId == userId)
        .ToList()
        );
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetRsvpById(int id)
    {
        Rsvp rsvp = _dbContext.Rsvps
        .Include(r => r.Event)
        .ThenInclude(e => e.UserProfile)
        .Include(r => r.UserProfile)
        .SingleOrDefault(r => r.Id == id);

        if (rsvp == null)
        {
            return NotFound();
        }
        return Ok(rsvp);
    }

    [HttpGet("{eventId}/eventId")]
    [Authorize]
    public IActionResult GetRsvpsByEventId(int eventId)
    {
        List<Rsvp> rsvps = _dbContext.Rsvps
        .Include(r => r.Event)
        .ThenInclude(e => e.UserProfile)
        .Include(r => r.UserProfile)
        .Where(r => r.EventId == eventId)
        .ToList();

        return Ok(rsvps);
    }

    [HttpPost]
    [Authorize]
    public IActionResult CreateRsvp(Rsvp rsvp)
    {
        rsvp.UserProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == rsvp.UserProfileId);
        _dbContext.Rsvps.Add(rsvp);
        _dbContext.SaveChanges();
        return Created($"api/rsvp/{rsvp}", rsvp);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult DeleteRsvp(int id)
    {
        Rsvp rsvp = _dbContext.Rsvps.SingleOrDefault(r => r.Id == id);

        if (rsvp != null)
        {
            _dbContext.Rsvps.Remove(rsvp);
            _dbContext.SaveChanges();
            return NoContent();
        }
        return NotFound();
    }
}