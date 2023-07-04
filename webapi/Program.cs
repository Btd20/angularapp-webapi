using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using webapi.Areas.Identity.Data;
using webapi.Data;
var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("webapiContextConnection") ?? throw new InvalidOperationException("Connection string 'webapiContextConnection' not found.");

builder.Services.AddDbContext<webapiContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddDefaultIdentity<webapiUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<webapiContext>();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
