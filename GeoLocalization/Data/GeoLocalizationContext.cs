using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using GeoLocalization.Models;

namespace GeoLocalization.Data
{
    public class GeoLocalizationContext : DbContext
    {
        public GeoLocalizationContext (DbContextOptions<GeoLocalizationContext> options) : base(options)
        {
        }

        public DbSet<Pais> Pais { get; set; }
        public DbSet<Oficines> Oficines { get; set; }
        public DbSet<Ciutats> Ciutats { get; set; }
    }
}