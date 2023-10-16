using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CraftyCorner.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ItemComments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ItemId = table.Column<int>(type: "integer", nullable: false),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Body = table.Column<string>(type: "text", nullable: false),
                    BorrowRequest = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemComments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pictures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Url = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pictures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    IdentityUserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProfiles_AspNetUsers_IdentityUserId",
                        column: x => x.IdentityUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Manufacturer = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: false),
                    isActive = table.Column<bool>(type: "boolean", nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    PictureId = table.Column<int>(type: "integer", nullable: false),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Items_Pictures_PictureId",
                        column: x => x.PictureId,
                        principalTable: "Pictures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Items_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "89f75b7b-1beb-44b4-9c61-eb0d652718de", "Admin", "admin" },
                    { "f2498ab4-e4b6-4e61-92c0-9568e96a8145", "a211e4bf-fd02-4793-b30e-93247bdc1860", "Courtney", "courtney" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "6a2f5d0b-3eac-4dab-ae9d-7f26d77e4a8c", 0, "0fa0f32c-c229-4877-8fe2-581812a8fbd6", "gail@gmail.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEFhJ9kw11wpvqa55dpL9oTrnriCc0uyoPLNapKRr5qDABpvb8EcPJ28sLjH72ogbXA==", null, false, "c8cc3dea-7778-4dfb-8fae-002af9df0438", false, "Gail" },
                    { "a7bc4dd9-8f10-4e24-8c0c-ef09a24ec9a5", 0, "2891b839-24c0-45a5-b0a0-7b9701700575", "shiree@gmail.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEPyKTvcIJmpIOsv3mJ2muNoa0eWIY+Dn6u9MpvUMyGnALV8Oe4B8opvIr0wt1e8KNw==", null, false, "6b855bfd-acb7-4760-9038-c6ff6d81c319", false, "Shiree" },
                    { "d9b5145a-739c-42d3-9e94-d2d439063d7e", 0, "a92a656d-845a-4d3e-98bb-5cbeb4138064", "joy@gmail.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAENWYXNtDRxzuiC+dNJTuzKLKszeeIPk3YqBiv/JWhiWEhzGL61Cj/SGoJaY6AuFDzQ==", null, false, "da153aa6-d779-4dfd-9429-7c41f01619e8", false, "Joy" },
                    { "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", 0, "983fc01a-2cbb-4b5c-97fb-fb406fe3f85e", "admina@strator.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEP/wmB2uI92juO7XAjZfKWGotnEL5q7uSMtbIqp6zzDgQqrTfvjutAknhYEAdDUmTg==", null, false, "1078d733-8869-4641-b244-9d2a44d99208", false, "Administrator" },
                    { "f2498ab4-e4b6-4e61-92c0-9568e96a8145", 0, "7e3e8a23-13d9-46e9-8cf0-e435c8bce704", "courtney@gmail.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEFgibnoikc203wsBGCUYuO7qiUeZw6BiPovY36mQCUVPBUhPLUME7y+eH5MWrVpnzw==", null, false, "9992cdfc-0b90-4d4d-8582-0e011aeeeb79", false, "Courtney" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "3D Printer" },
                    { 2, "Die or Die Cut Machine (Sizzix, Etc.)" },
                    { 3, "Embosser (Plate, Folder, Etc.)" },
                    { 4, "Gel Plate" },
                    { 5, "Heat Press" },
                    { 6, "Lamination Machine" },
                    { 7, "Laser Cutter/Machine" },
                    { 8, "Misc Hand Tools" },
                    { 9, "Other" },
                    { 10, "Paper Cutter Machine (Cricut, Cameo, Brother ScanNCut, Etc.)" },
                    { 11, "Sewing Machine" },
                    { 12, "Stamp Set" }
                });

            migrationBuilder.InsertData(
                table: "ItemComments",
                columns: new[] { "Id", "Body", "BorrowRequest", "Date", "ItemId", "UserProfileId" },
                values: new object[,]
                {
                    { 1, "I'd love to schedule some time with you and your Maker 3. Do you have availability within the next week or so?", true, new DateTime(2023, 9, 21, 11, 5, 12, 0, DateTimeKind.Unspecified), 1, 2 },
                    { 2, "Sure! I'm retired and have a flexible schedule. Send me an email at gail@crafts.comx to set something up.", false, new DateTime(2023, 9, 22, 12, 4, 11, 0, DateTimeKind.Unspecified), 1, 5 },
                    { 3, "I scheduled a play date with Gail, and we had a blast. Made some super cute crafts with the Maker 3 and made a new crafty friend. She's got an amazing setup.", false, new DateTime(2023, 9, 28, 12, 4, 11, 0, DateTimeKind.Unspecified), 1, 2 }
                });

            migrationBuilder.InsertData(
                table: "Pictures",
                columns: new[] { "Id", "Url" },
                values: new object[,]
                {
                    { 1, "https://photos.app.goo.gl/a1W2QAi5RXE7xrmt8" },
                    { 2, "https://photos.app.goo.gl/TgrU2UY4yMrtGW2j8" },
                    { 3, "https://photos.app.goo.gl/Xdqubxiexa5GYfhJ6" },
                    { 4, "https://photos.app.goo.gl/Qm9c8RBRJ6yYidRx8" },
                    { 5, "https://photos.app.goo.gl/kC9X4eGFXFc2EoVy9" },
                    { 6, "https://photos.app.goo.gl/wUawcU2MdwRWnkdp9" },
                    { 7, "https://photos.app.goo.gl/h3Z1Djmcy3btoR4w6" },
                    { 8, "https://photos.app.goo.gl/zeDrmtvjsNfrLQ2y9" },
                    { 9, "https://photos.app.goo.gl/cfi8qQ66o85h6ABa8" },
                    { 10, "https://photos.app.goo.gl/BKDBdBUHa4Ym4dhy8" },
                    { 11, "https://photos.app.goo.gl/tpMUcLgNXwAcmjyAA" },
                    { 12, "https://photos.app.goo.gl/2ac6tXC3YkstNQY88" },
                    { 13, "https://photos.app.goo.gl/vWiFzgXCxrTMzv5MA" },
                    { 14, "https://photos.app.goo.gl/m2puCvfkXeUR3Hj88" },
                    { 15, "https://photos.app.goo.gl/XS8gnGaM3JGjSEHy8" },
                    { 16, "https://photos.app.goo.gl/cAvyzFM9dXCWqWw39" },
                    { 17, "https://photos.app.goo.gl/ynKKkxUZh9QJWtZc6" },
                    { 18, "https://photos.app.goo.gl/9BfwyoQiAJhVwYp27" },
                    { 19, "https://photos.app.goo.gl/jdPXhF8RGFzLEQEg8" },
                    { 20, "https://photos.app.goo.gl/Q8hbT5DivshS59sp6" },
                    { 21, "https://photos.app.goo.gl/jGGE4FsiX8WHmtVe7" },
                    { 22, "https://photos.app.goo.gl/Lh3cnrxbZQSuYb3p7" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f" });

            migrationBuilder.InsertData(
                table: "UserProfiles",
                columns: new[] { "Id", "Address", "FirstName", "IdentityUserId", "LastName" },
                values: new object[,]
                {
                    { 1, "101 Main Street", "Admina", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", "Strator" },
                    { 2, "555 Ocean Avenue", "Courtney", "f2498ab4-e4b6-4e61-92c0-9568e96a8145", "Gulledge" },
                    { 3, "555 Jackson Street", "Joy", "d9b5145a-739c-42d3-9e94-d2d439063d7e", "Forbess" },
                    { 4, "555 Middleburg Drive", "Shiree", "a7bc4dd9-8f10-4e24-8c0c-ef09a24ec9a5", "Bridges" },
                    { 5, "555 Palm Court", "Gail", "6a2f5d0b-3eac-4dab-ae9d-7f26d77e4a8c", "Fogarty" }
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "CategoryId", "Manufacturer", "Name", "Notes", "PictureId", "UserProfileId", "isActive" },
                values: new object[,]
                {
                    { 1, 10, "Cricut", "Maker 3", "Not ready to loan this out, but I'd welcome you to come to my house to use.", 15, 5, true },
                    { 2, 10, "Silhouette", "Cameo 4", "Requires software to run and is registered with my laptop. May need to set up a play date to use.", 2, 2, true },
                    { 3, 2, "Sizzix", "Big Shot", "I have quite a few dies as well, not yet loaded on the site.", 3, 2, true },
                    { 4, 8, "Cricut", "Multi Tool", "Used for weeding", 19, 3, true }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_CategoryId",
                table: "Items",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_PictureId",
                table: "Items",
                column: "PictureId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_UserProfileId",
                table: "Items",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_IdentityUserId",
                table: "UserProfiles",
                column: "IdentityUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "ItemComments");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Pictures");

            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
