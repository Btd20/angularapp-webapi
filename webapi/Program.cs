using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using webapi.Areas.Identity.Data;
using webapi.Data;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("webapiContextConnection") ?? throw new InvalidOperationException("Connection string 'webapiContextConnection' not found.");

builder.Services.AddDbContext<webapiContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddDefaultIdentity<webapiUser>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddRoles<IdentityRole>() // Agrega esta línea para habilitar el uso de roles
    .AddEntityFrameworkStores<webapiContext>();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

/* Creació i assignació d'usuari Administrador */

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var userManager = services.GetRequiredService<UserManager<webapiUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

    var roleName = "Administrador";

    if (!await roleManager.RoleExistsAsync(roleName))
    {
        var role = new IdentityRole(roleName);
        await roleManager.CreateAsync(role);
    }

    var usuario = await userManager.FindByEmailAsync("admin@gmail.com");

    if (usuario != null && !await userManager.IsInRoleAsync(usuario, roleName))
    {
        await userManager.AddToRoleAsync(usuario, roleName);
    }
}

app.Run();
