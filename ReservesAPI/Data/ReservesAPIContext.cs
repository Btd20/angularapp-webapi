using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReservesAPI.Models;

namespace ReservesAPI.Data
{
    public class ReservesAPIContext : IdentityDbContext
    {
        public ReservesAPIContext(DbContextOptions<ReservesAPIContext> options) : base(options)
        {

        }

        public DbSet<Reserves> Reserves { get; set; }
        public DbSet<Sales> Sales { get; set; }


    }
}
