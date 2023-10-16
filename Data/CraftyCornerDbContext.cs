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
    public DbSet<Picture> Pictures { get; set; }

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

        modelBuilder.Entity<Picture>().HasData(new Picture[]
        {
            new Picture { Id = 1, Url = "https://photos.app.goo.gl/a1W2QAi5RXE7xrmt8" }, // no image available
            new Picture { Id = 2, Url = "https://photos.app.goo.gl/TgrU2UY4yMrtGW2j8" }, // Cameo 4
            new Picture { Id = 3, Url = "https://photos.app.goo.gl/Xdqubxiexa5GYfhJ6" }, // Sizzix Big Shot
            new Picture { Id = 4, Url = "https://photos.app.goo.gl/Qm9c8RBRJ6yYidRx8" }, // EZ Bowz
            new Picture { Id = 5, Url = "https://photos.app.goo.gl/kC9X4eGFXFc2EoVy9" }, // T-Shirt guide
            new Picture { Id = 6, Url = "https://photos.app.goo.gl/wUawcU2MdwRWnkdp9" }, // Cameo 5
            new Picture { Id = 7, Url = "https://photos.app.goo.gl/h3Z1Djmcy3btoR4w6" }, // Xtool Laser
            new Picture { Id = 8, Url = "https://photos.app.goo.gl/zeDrmtvjsNfrLQ2y9" }, // Anbestor heat press
            new Picture { Id = 9, Url = "https://photos.app.goo.gl/cfi8qQ66o85h6ABa8" }, // Silhouette pens
            new Picture { Id = 10, Url = "https://photos.app.goo.gl/BKDBdBUHa4Ym4dhy8" }, // iVyne light pad
            new Picture { Id = 11, Url = "https://photos.app.goo.gl/tpMUcLgNXwAcmjyAA" }, // iVyne weeding scrap collector
            new Picture { Id = 12, Url = "https://photos.app.goo.gl/2ac6tXC3YkstNQY88" }, // Gemini embosser
            new Picture { Id = 13, Url = "https://photos.app.goo.gl/vWiFzgXCxrTMzv5MA" }, // Brother ScanNCut
            new Picture { Id = 14, Url = "https://photos.app.goo.gl/m2puCvfkXeUR3Hj88" }, // iVyne weeding set
            new Picture { Id = 15, Url = "https://photos.app.goo.gl/XS8gnGaM3JGjSEHy8" }, // Cricut Maker 3
            new Picture { Id = 16, Url = "https://photos.app.goo.gl/cAvyzFM9dXCWqWw39" }, // Cricut ExploreAir 2
            new Picture { Id = 17, Url = "https://photos.app.goo.gl/ynKKkxUZh9QJWtZc6" }, // Cricut Heat Press
            new Picture { Id = 18, Url = "https://photos.app.goo.gl/9BfwyoQiAJhVwYp27" }, // Cricut Joy Xtra
            new Picture { Id = 19, Url = "https://photos.app.goo.gl/jdPXhF8RGFzLEQEg8" }, // Cricut multi tool
            new Picture { Id = 20, Url = "https://photos.app.goo.gl/Q8hbT5DivshS59sp6" }, // Cricut mug press
            new Picture { Id = 21, Url = "https://photos.app.goo.gl/jGGE4FsiX8WHmtVe7" }, // ? brayer
            new Picture { Id = 22, Url = "https://photos.app.goo.gl/Lh3cnrxbZQSuYb3p7" } // Gel Press
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
                PictureId = 15,
                UserProfileId = 5
            },
            new Item
            {
                Id = 2,
                Name = "Cameo 4",
                Manufacturer = "Silhouette",
                Notes = "Requires software to run and is registered with my laptop. May need to set up a play date to use.",
                isActive = true,
                CategoryId = 10,
                PictureId = 2,
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
                PictureId = 3,
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
                PictureId = 19,
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