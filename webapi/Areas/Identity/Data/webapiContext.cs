using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using webapi.Areas.Identity.Data;
using webapi.Models;

namespace webapi.Data;

public class webapiContext : IdentityDbContext<webapiUser>
{
    public webapiContext(DbContextOptions<webapiContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        // Customize the ASP.NET Identity model and override the defaults if needed.
        // For example, you can rename the ASP.NET Identity table names and more.
        // Add your customizations after calling base.OnModelCreating(builder);
    }

    public DbSet<webapi.Models.Pais> Pais { get; set; } = default!;

    public DbSet<webapi.Models.Oficines> Oficines { get; set; } = default!;

    public DbSet<webapi.Models.Ciutats> Ciutats { get; set; } = default!;
}
