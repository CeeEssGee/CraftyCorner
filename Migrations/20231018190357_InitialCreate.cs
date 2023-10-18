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
                    PictureUrl = table.Column<string>(type: "text", nullable: false),
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
                    { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "27a4d34d-eec2-4372-9777-27f1793e8b85", "Admin", "admin" },
                    { "f2498ab4-e4b6-4e61-92c0-9568e96a8145", "d44b832a-ac77-4b91-8c2d-2ed4dd0541f3", "Courtney", "courtney" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "6a2f5d0b-3eac-4dab-ae9d-7f26d77e4a8c", 0, "39d593f2-8176-45b8-8753-870c4da69b19", "gail@gmail.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEBsd1X8qAgohrMg3Xn99wezMmR2hGrt0dkhQhR8JUioDJTqLzFPDrysnixXsm9UPlw==", null, false, "49d9a574-67cc-4bb6-aca7-debb5cff62ea", false, "Gail" },
                    { "a7bc4dd9-8f10-4e24-8c0c-ef09a24ec9a5", 0, "95d25475-20b0-4e51-893b-64699c165400", "shiree@gmail.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEE7AYl1jFUzrBc0FFry2cTP/HoHTCWIeYU84qyvPpQ+Jw3ynpeppfV6TBKTd4q8t4w==", null, false, "72c4119e-0985-4c17-b0cc-a4afc924e029", false, "Shiree" },
                    { "d9b5145a-739c-42d3-9e94-d2d439063d7e", 0, "0c460f08-1ce9-44e6-96ea-9aaa61954f52", "joy@gmail.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAELDudZC1Cb3+U5rxog4LmNbtGMzltL4pi07udhtw8iK2ddzfHiqzd6vOnZcqG1kaKA==", null, false, "58444edb-78f7-41c4-837c-a733a3d92944", false, "Joy" },
                    { "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", 0, "f04840a2-54e2-49f1-acd9-05da7a32a0d4", "admina@strator.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEOu1FrkK+q15PfISoYDnvIccbiboNHncElKzv1L540rZxILFDYuycnVm+ZuIv95Xmw==", null, false, "a68265f3-5126-45af-846a-db1203b51071", false, "Administrator" },
                    { "f2498ab4-e4b6-4e61-92c0-9568e96a8145", 0, "824c6d8e-ab0e-4037-aec3-d7587570df16", "courtney@gmail.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEG5b+N93O2e9hQpXUYPTeWMR+bdjwvEUQti7mVro9qmJKBA7n5tyO6GHZ1HJDtS7dg==", null, false, "e7bde270-d469-401a-a29e-e7facde06722", false, "Courtney" }
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
                columns: new[] { "Id", "CategoryId", "Manufacturer", "Name", "Notes", "PictureUrl", "UserProfileId", "isActive" },
                values: new object[,]
                {
                    { 1, 10, "Cricut", "Maker 3", "Not ready to loan this out, but I'd welcome you to come to my house to use.", "https://asset.cloudinary.com/dq4w2zwr2/7bd8376af3b8c75fc108f65acab9731b", 5, true },
                    { 2, 10, "Silhouette", "Cameo 4", "Requires software to run and is registered with my laptop. May need to set up a play date to use.", "https://asset.cloudinary.com/dq4w2zwr2/31dad32a8f0b4158f8042333b448870e", 2, true },
                    { 3, 2, "Sizzix", "Big Shot", "I have quite a few dies as well, not yet loaded on the site.", "https://asset.cloudinary.com/dq4w2zwr2/cd8bcc5b68fa0d1cc62eedc047d2316a", 2, true },
                    { 4, 8, "Cricut", "Multi Tool", "Used for weeding", "https://asset.cloudinary.com/dq4w2zwr2/db2d35b8cda97d72eb7578cefccc437d", 3, true }
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
                name: "UserProfiles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
