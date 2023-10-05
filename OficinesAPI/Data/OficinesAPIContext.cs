using System.Collections.Generic;

namespace OficinesAPI.Data
{
    public class OficinesAPIContext
    {

        public OficinesAPIContext(DbContextOptions<OficinesAPIContext> options) : base(options)
        {
        }

        public DbSet<Oficina> Oficines { get; set; } = default!;
    }
}
