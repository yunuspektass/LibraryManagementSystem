using LibraryManagementSystem.Core.Security;
using LibraryManagementSystem.DataAccess.Context;
using LibraryManagementSystem.WebAPI.Middleware;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace LibraryManagementSystem.WebAPI.Extensions;

public static class ApplicationBuilderExtensions
{
    public static WebApplication UseCustomMiddlewares(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseMiddleware<CorrelationIdMiddleware>();
        app.UseSerilogRequestLogging();

        // CORS middleware'i - EN ÖNCE olmalı (HTTPS redirect'ten önce!)
        app.UseCors("AllowReactApp");

        // HTTPS Redirect - Development'ta kapalı
        if (!app.Environment.IsDevelopment())
        {
            app.UseHttpsRedirection();
        }

        // Authentication ve Authorization middleware'leri
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        return app;
    }

    public static async Task SeedRolesAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<int>>>();

        // User rolünü oluştur
        if (!await roleManager.RoleExistsAsync(Roles.User))
        {
            await roleManager.CreateAsync(new IdentityRole<int>(Roles.User));
        }

        // LibraryStaff rolünü oluştur
        if (!await roleManager.RoleExistsAsync(Roles.LibraryStaff))
        {
            await roleManager.CreateAsync(new IdentityRole<int>(Roles.LibraryStaff));
        }
    }
}
