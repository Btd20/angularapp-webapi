using Microsoft.EntityFrameworkCore;
using ReservesAPI.Models;

namespace ReservesAPI.Data
{
    public class SalesAPIContext : DbContext
    {
        public SalesAPIContext(DbContextOptions<SalesAPIContext> options) : base(options)
        {

        }

        public DbSet<Sales> Sala { get; set; }
    }
}

