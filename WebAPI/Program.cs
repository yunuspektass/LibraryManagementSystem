using System;
using System.Linq;
using LibraryManagementSystem.Business.GenericRepository.ConcRep;
using LibraryManagementSystem.Business.Services;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.DataAccess.Context;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("LibraryDb")
    ?? throw new InvalidOperationException("Connection string 'LibraryDb' is not configured.");

builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddScoped<BookRepository>(sp => new BookRepository(sp.GetRequiredService<LibraryContext>()));
builder.Services.AddScoped<MemberRepository>(sp => new MemberRepository(sp.GetRequiredService<LibraryContext>()));

builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IMemberService, MemberService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
