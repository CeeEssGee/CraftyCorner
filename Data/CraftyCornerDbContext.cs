using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using CraftyCorner.Models;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel;

namespace CraftyCorner.Data;
public class CraftyCornerDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<ItemComment> ItemComments { get; set; }
    public CraftyCornerDbContext(DbContextOptions<CraftyCornerDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole[]
        {
            new()
            {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
            },
            new()
            {
                Id = "f2498ab4-e4b6-4e61-92c0-9568e96a8145",
                Name = "Courtney",
                NormalizedName = "courtney"
            }
        }
        );

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser[]
        {
            new()
            {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },

            new()
            {
            Id = "f2498ab4-e4b6-4e61-92c0-9568e96a8145",
            UserName = "Courtney",
            Email = "courtney@gmail.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },

            new()
            {
            Id = "d9b5145a-739c-42d3-9e94-d2d439063d7e",
            UserName = "Joy",
            Email = "joy@gmail.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },

            new()
            {
            Id = "a7bc4dd9-8f10-4e24-8c0c-ef09a24ec9a5",
            UserName = "Shiree",
            Email = "shiree@gmail.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },

            new()
            {
            Id = "6a2f5d0b-3eac-4dab-ae9d-7f26d77e4a8c",
            UserName = "Gail",
            Email = "gail@gmail.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            }

        });

        // do I need to update this one when I add users?
        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });

        modelBuilder.Entity<UserProfile>().HasData(new UserProfile[]
        {
            new()
            {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
        },
        new()
        {
            Id = 2,
            IdentityUserId = "f2498ab4-e4b6-4e61-92c0-9568e96a8145",
            FirstName = "Courtney",
            LastName = "Gulledge",
            Address = "555 Ocean Avenue",
        },
        new()
        {
            Id = 3,
            IdentityUserId = "d9b5145a-739c-42d3-9e94-d2d439063d7e",
            FirstName = "Joy",
            LastName = "Forbess",
            Address = "555 Jackson Street",
        },
        new()
        {
            Id = 4,
            IdentityUserId = "a7bc4dd9-8f10-4e24-8c0c-ef09a24ec9a5",
            FirstName = "Shiree",
            LastName = "Bridges",
            Address = "555 Middleburg Drive",
        },
        new()
        {
            Id = 5,
            IdentityUserId = "6a2f5d0b-3eac-4dab-ae9d-7f26d77e4a8c",
            FirstName = "Gail",
            LastName = "Fogarty",
            Address = "555 Palm Court",
        }

        }
        );

        modelBuilder.Entity<Category>().HasData(new Category[]
        {
        new Category { Id = 1, Name = "3D Printer" },
        new Category { Id = 2, Name = "Die or Die Cut Machine (Sizzix, Etc.)" },
        new Category { Id = 3, Name = "Embosser (Plate, Folder, Etc.)" },
        new Category { Id = 4, Name = "Gel Plate" },
        new Category { Id = 5, Name = "Heat Press" },
        new Category { Id = 6, Name = "Lamination Machine" },
        new Category { Id = 7, Name = "Laser Cutter/Machine" },
        new Category { Id = 8, Name = "Misc Hand Tools" },
        new Category { Id = 9, Name = "Other" },
        new Category { Id = 10, Name = "Paper Cutter Machine (Cricut, Cameo, Brother ScanNCut, Etc.)" },
        new Category { Id = 11, Name = "Sewing Machine" },
        new Category { Id = 12, Name = "Stamp Set" }
        }
        );

        modelBuilder.Entity<Item>().HasData(new Item[]
        {
            new Item
            {
                Id = 1,
                Name = "Maker 3",
                Manufacturer = "Cricut",
                Notes = "Not ready to loan this out, but I'd welcome you to come to my house to use.",
                isActive = true,
                CategoryId = 10,
                UserProfileId = 5,
                PictureUrl = "https://asset.cloudinary.com/dq4w2zwr2/7bd8376af3b8c75fc108f65acab9731b"
            },
            new Item
            {
                Id = 2,
                Name = "Cameo 4",
                Manufacturer = "Silhouette",
                Notes = "Requires software to run and is registered with my laptop. May need to set up a play date to use.",
                isActive = true,
                CategoryId = 10,
                PictureUrl = "https://asset.cloudinary.com/dq4w2zwr2/31dad32a8f0b4158f8042333b448870e",
                UserProfileId = 2
            },
            new Item
            {
                Id = 3,
                Name = "Big Shot",
                Manufacturer = "Sizzix",
                Notes = "I have quite a few dies as well, not yet loaded on the site.",
                isActive = true,
                CategoryId = 2,
                PictureUrl = "https://asset.cloudinary.com/dq4w2zwr2/cd8bcc5b68fa0d1cc62eedc047d2316a",
                UserProfileId = 2
            },
            new Item
            {
                Id = 4,
                Name = "Multi Tool",
                Manufacturer = "Cricut",
                Notes = "Used for weeding",
                isActive = true,
                CategoryId = 8,
                PictureUrl = "https://asset.cloudinary.com/dq4w2zwr2/db2d35b8cda97d72eb7578cefccc437d",
                UserProfileId = 3
            }
        }
        );

        modelBuilder.Entity<ItemComment>().HasData(new ItemComment[]
        {
            new ItemComment
            {
                Id = 1,
                ItemId = 1,
                UserProfileId = 2,
                Date = new DateTime(2023, 09, 21, 11, 05, 12),
                Body = "I'd love to schedule some time with you and your Maker 3. Do you have availability within the next week or so?",
                BorrowRequest = true
            },
            new ItemComment
            {
                Id = 2,
                ItemId = 1,
                UserProfileId = 5,
                Date = new DateTime(2023, 09, 22, 12, 04, 11),
                Body = "Sure! I'm retired and have a flexible schedule. Send me an email at gail@crafts.comx to set something up.",
                BorrowRequest = false
            },
            new ItemComment
            {
                Id = 3,
                ItemId = 1,
                UserProfileId = 2,
                Date = new DateTime(2023, 09, 28, 12, 04, 11),
                Body = "I scheduled a play date with Gail, and we had a blast. Made some super cute crafts with the Maker 3 and made a new crafty friend. She's got an amazing setup.",
                BorrowRequest = false
            },
        }
        );
    }
}