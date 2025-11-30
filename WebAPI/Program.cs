using LibraryManagementSystem.WebAPI.Extensions;

var builder = WebApplication.CreateBuilder(args);

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
