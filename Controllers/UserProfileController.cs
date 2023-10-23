using CraftyCorner.Data;
using CraftyCorner.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CraftyCorner.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private CraftyCornerDbContext _dbContext;

    public UserProfileController(CraftyCornerDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.UserProfiles.ToList());
    }

    [HttpGet("withroles")]
    // [Authorize(Roles = "Admin")]
    public IActionResult GetWithRoles()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            // CreateDateTime = up.CreateDateTime,
            LastName = up.LastName,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            // ImageLocation = up.ImageLocation,
            // IsActive = up.IsActive,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        }).OrderBy(up => up.UserName).ToList());
    }

    [HttpGet("deactivated")]
    // [Authorize(Roles = "Admin")]
    public IActionResult GetDeactivated()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            // CreateDateTime = up.CreateDateTime,
            LastName = up.LastName,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            // ImageLocation = up.ImageLocation,
            // IsActive = up.IsActive,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        })
        // .Where(up => up.IsActive == false)
        .ToList());
    }

    [HttpPost("promote/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Promote(string id)
    {
        IdentityRole role = _dbContext.Roles.SingleOrDefault(r => r.Name == "Admin");
        _dbContext.UserRoles.Add(new IdentityUserRole<string>
        {
            RoleId = role.Id,
            UserId = id
        });
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost("demote/{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Demote(string id)
    {
        IdentityRole role = _dbContext.Roles
            .SingleOrDefault(r => r.Name == "Admin");

        IdentityUserRole<string> userRole = _dbContext
            .UserRoles
            .SingleOrDefault(ur =>
                ur.RoleId == role.Id &&
                ur.UserId == id);
        if (_dbContext.UserRoles.Where(ur => ur.RoleId == role.Id).Count() > 1)
        {
            _dbContext.UserRoles.Remove(userRole);
            _dbContext.SaveChanges();
            return NoContent();
        }
        return StatusCode(418, "You're the only admin left!");

    }

    [Authorize]
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        UserProfile user = _dbContext
            .UserProfiles
            .Include(up => up.IdentityUser)
            .SingleOrDefault(up => up.Id == id);

        if (user == null)
        {
            return NotFound();
        }
        user.Email = user.IdentityUser.Email;
        user.UserName = user.IdentityUser.UserName;
        return Ok(user);
    }

    [HttpGet("withroles/{id}")]
    // [Authorize(Roles = "Admin")]
    public IActionResult GetWithByIDRoles(int id)
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            // CreateDateTime = up.CreateDateTime,
            LastName = up.LastName,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            // ImageLocation = up.ImageLocation,
            // IsActive = up.IsActive,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        }).SingleOrDefault(up => up.Id == id));
    }

    [HttpPut("{id}")]
    // [Authorize(Roles = "Admin")]
    public IActionResult EditUserProfile(UserProfile userProfile)
    {
        UserProfile matching = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == userProfile.Id);
        matching.FirstName = userProfile.FirstName;
        matching.LastName = userProfile.LastName;
        matching.Email = userProfile.Email;
        matching.UserName = userProfile.UserName;
        _dbContext.SaveChanges();
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("deactivate/{id}")]
    public IActionResult DeactivateUser(int id)
    {
        UserProfile userToUpdate = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);
        if (userToUpdate == null)
        {
            return NotFound();
        }

        // userToUpdate.IsActive = false;
        _dbContext.SaveChanges();
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("activate/{id}")]
    public IActionResult ActivateUser(int id)
    {
        UserProfile userToUpdate = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);
        if (userToUpdate == null)
        {
            return NotFound();
        }

        // userToUpdate.IsActive = true;
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPut("updateImage/{userId}")]
    [Authorize]
    public IActionResult updateImage(int userId, [FromBody] string imglocation)
    {
        //find the user to update. 
        UserProfile userProfileToUpdate = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == userId);
        if (userProfileToUpdate != null)
        {
            // userProfileToUpdate.ImageLocation = imglocation;
            _dbContext.SaveChanges();
            return NoContent();
        }
        return NotFound();
    }
    //update useprofile image location

}