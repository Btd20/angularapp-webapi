using Microsoft.EntityFrameworkCore;
using ReservesAPI.Models;

namespace ReservesAPI.Data
{
    public class ReservesAPIContext : DbContext
    {
        public ReservesAPIContext(DbContextOptions<ReservesAPIContext> options) : base(options)
        {

        }

        public DbSet<Reserves> Reserva { get; set; }
        public DbSet<Sales> Sales { get; set; }


    }
}
