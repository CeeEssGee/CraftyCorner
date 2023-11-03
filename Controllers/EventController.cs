using CraftyCorner.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CraftyCorner.Models;

namespace CraftyCorner.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventController : ControllerBase
{
    private CraftyCornerDbContext _dbContext;

    public EventController(CraftyCornerDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetEvents()
    {
        return Ok(_dbContext.Events
        .Include(e => e.UserProfile)
        .Include(e => e.Rsvps)
        .ThenInclude(r => r.UserProfile)
        .OrderBy(e => e.DateTime)
        .ToList()
        );
    }

    [HttpGet("{userId}/userId")]
    [Authorize]
    public IActionResult GetEventsByUserId(int userId)
    {
        return Ok(_dbContext.Events
        .Include(e => e.UserProfile)
        .Include(e => e.Rsvps)
        .ThenInclude(r => r.UserProfile)
        .Where(e => e.UserProfileId == userId)
        .ToList()
        );
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetEventById(int id)
    {
        var eventToGet = _dbContext.Events.Include(e => e.UserProfile)
            .Include(e => e.Rsvps)
            .ThenInclude(r => r.UserProfile)
            .SingleOrDefault(e => e.Id == id);

        var myEventDTO = new EventDTO
        {
            Id = eventToGet.Id,
            Name = eventToGet.Name,
            UserProfileId = eventToGet.UserProfileId,
            DateTime = eventToGet.DateTime,
            Duration = eventToGet.Duration,
            Cost = eventToGet.Cost,
            Address = eventToGet.Address,
            Body = eventToGet.Body,
            PictureUrl = eventToGet.PictureUrl,
            TotalSeats = eventToGet.TotalSeats,
            Rsvps = eventToGet.Rsvps,
            UserProfile = eventToGet.UserProfile
        };

        return Ok(myEventDTO);

    }

    [HttpPost]
    [Authorize]
    public IActionResult CreateEvent(Event eventToPost)
    {
        eventToPost.UserProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == eventToPost.UserProfileId);
        _dbContext.Events.Add(eventToPost);
        _dbContext.SaveChanges();
        return Created($"api/event/{eventToPost.Id}", eventToPost);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult DeleteEvent(int id)
    {
        Event eventToDelete = _dbContext.Events.SingleOrDefault(e => e.Id == id);

        if (eventToDelete != null)
        {
            _dbContext.Events.Remove(eventToDelete);
            _dbContext.SaveChanges();
            return NoContent();
        }
        return NotFound();
    }

    [HttpPut("{id}/edit")]
    [Authorize]
    public IActionResult UpdateEvent(int id, Event updatedEvent)
    {
        Event eventToUpdate = _dbContext.Events.SingleOrDefault(e => e.Id == id);

        if (eventToUpdate == null)
        {
            return NotFound();
        }
        if (id != eventToUpdate.Id)
        {
            return BadRequest();
        }

        eventToUpdate.Name = updatedEvent.Name;
        eventToUpdate.DateTime = updatedEvent.DateTime;
        eventToUpdate.Duration = updatedEvent.Duration;
        eventToUpdate.Cost = updatedEvent.Cost;
        eventToUpdate.Address = updatedEvent.Address;
        eventToUpdate.Body = updatedEvent.Body;
        eventToUpdate.PictureUrl = updatedEvent.PictureUrl;
        eventToUpdate.TotalSeats = updatedEvent.TotalSeats;
        _dbContext.SaveChanges();
        return NoContent();
    }

}