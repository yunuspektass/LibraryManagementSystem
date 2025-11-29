using LibraryManagementSystem.Business.GenericRepository.ConcRep;
using LibraryManagementSystem.Business.Mapper;
using LibraryManagementSystem.Business.Services.Interfaces;
using LibraryManagementSystem.Business.Services.Interfaces.Author;
using LibraryManagementSystem.Business.Services.Interfaces.BorrowRecord;
using LibraryManagementSystem.Business.Services.Interfaces.Category;
using LibraryManagementSystem.Business.Services.Interfaces.User;
using LibraryManagementSystem.Business.Services.Managers;
using LibraryManagementSystem.Business.Services.Managers.Author;
using LibraryManagementSystem.Business.Services.Managers.Book;
using LibraryManagementSystem.Business.Services.Managers.BorrowRecord;
using LibraryManagementSystem.Business.Services.Managers.Category;
using LibraryManagementSystem.Business.Services.Managers.User;
using LibraryManagementSystem.Core.Security;
using LibraryManagementSystem.Core.Services.Interfaces;
using LibraryManagementSystem.Core.Services.Managers;
using LibraryManagementSystem.DataAccess.Context;
using LibraryManagementSystem.Domain.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace LibraryManagementSystem.WebAPI.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddCustomInfrastructure(this IServiceCollection services, IConfiguration config)
    {
        // Database Configuration
        var connectionString = config.GetConnectionString("LibraryDb")
            ?? throw new InvalidOperationException("Connection string 'LibraryDb' is not configured.");

        services.AddDbContext<LibraryContext>(options =>
            options.UseSqlServer(connectionString));

        // Identity Configuration
        services.AddIdentity<User, IdentityRole<int>>(options =>
        {
            options.Password.RequireDigit = true;
            options.Password.RequireLowercase = true;
            options.Password.RequireUppercase = true;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequiredLength = 6;
            options.User.RequireUniqueEmail = true;
        })
        .AddEntityFrameworkStores<LibraryContext>()
        .AddDefaultTokenProviders();

        // JWT Authentication Configuration
        var jwtSettings = config.GetSection("Jwt");
        var secretKey = jwtSettings["SecretKey"] ?? throw new ArgumentNullException("Jwt:SecretKey");
        var key = Encoding.ASCII.GetBytes(secretKey);

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = jwtSettings["Issuer"],
                ValidateAudience = true,
                ValidAudience = jwtSettings["Audience"],
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
        });

        // Authorization Policies
        services.AddAuthorization(options =>
        {
            options.AddPolicy("UserPolicy", policy => policy.RequireRole(Roles.User));
            options.AddPolicy("LibraryStaffPolicy", policy => policy.RequireRole(Roles.LibraryStaff));
            options.AddPolicy("UserOrLibraryStaffPolicy", policy => policy.RequireRole(Roles.User, Roles.LibraryStaff));
        });

        // AutoMapper Configuration
        services.AddAutoMapper(typeof(AuthorMapping).Assembly);

        // Repository Registration
        services.AddScoped<AuthorRepository>(sp => new AuthorRepository(sp.GetRequiredService<LibraryContext>()));
        services.AddScoped<BookRepository>(sp => new BookRepository(sp.GetRequiredService<LibraryContext>()));
        services.AddScoped<CategoryRepository>(sp => new CategoryRepository(sp.GetRequiredService<LibraryContext>()));
        services.AddScoped<UserRepository>(sp => new UserRepository(sp.GetRequiredService<LibraryContext>()));
        services.AddScoped<BorrowRecordRepository>(sp => new BorrowRecordRepository(sp.GetRequiredService<LibraryContext>()));

        // Service Registration
        services.AddScoped<IJwtService, JwtManager>();
        services.AddScoped<IAuthService, AuthManager>();
        services.AddScoped<IAuthorService, AuthorManager>();
        services.AddScoped<IBookService, BookManager>();
        services.AddScoped<ICategoryService, CategoryManager>();
        services.AddScoped<IUserService, UserManager>();
        services.AddScoped<IBorrowRecordService, BorrowRecordManager>();

        return services;
    }

    public static IServiceCollection AddSwaggerWithJwtAuth(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Library Management System API",
                Version = "v1",
                Description = "Library Management System API with JWT Authentication"
            });

            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using the Bearer scheme (Example: 'Bearer {token}')",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            });
        });

        return services;
    }
}

