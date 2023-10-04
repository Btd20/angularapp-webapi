using Microsoft.EntityFrameworkCore;
using PaisosAPI.Models;


namespace PaisosAPI.Data
{
    public class PaisosAPIContext : DbContext
    {
        public PaisosAPIContext(DbContextOptions<PaisosAPIContext> options) : base(options)
        {
        }

        public DbSet<Pais> Pais { get; set; }
    }
}
