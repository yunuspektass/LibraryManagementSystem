using LibraryManagementSystem.WebAPI.Extensions;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .Enrich.FromLogContext()
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, services, configuration) =>
{
    configuration
        .ReadFrom.Configuration(context.Configuration)
        .ReadFrom.Services(services)
        .Enrich.FromLogContext()
        .WriteTo.Console();
});

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCustomInfrastructure(builder.Configuration);
builder.Services.AddSwaggerWithJwtAuth();

var app = builder.Build();

// Seed roles if they don't exist
await app.SeedRolesAsync();

// Configure the HTTP request pipeline
app.UseCustomMiddlewares();

app.Run();
