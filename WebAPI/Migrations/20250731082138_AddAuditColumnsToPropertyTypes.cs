using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class AddAuditColumnsToPropertyTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstPossesionOn",
                table: "Properties");

            migrationBuilder.AddColumn<int>(
                name: "LastUpdatedBy",
                table: "PropertyTypes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdatedOn",
                table: "PropertyTypes",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "EstPossessionOn",
                table: "Properties",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastUpdatedBy",
                table: "PropertyTypes");

            migrationBuilder.DropColumn(
                name: "LastUpdatedOn",
                table: "PropertyTypes");

            migrationBuilder.DropColumn(
                name: "EstPossessionOn",
                table: "Properties");

            migrationBuilder.AddColumn<DateTime>(
                name: "EstPossesionOn",
                table: "Properties",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
