using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webapi.Data;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservesController : ControllerBase
    {
        private readonly webapiContext _context;

        public ReservesController(webapiContext context)
        {
            _context = context;
        }

        // GET: Reserves
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reserves>>> GetReserves()
        {
            var reserves = await _context.Reserves.Include(r => r.sala).ToListAsync();
            return Ok(reserves);
        }

        // GET: Reserves/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reserves>> GetReserve(int id)
        {
            var reserve = await _context.Reserves.Include(r => r.sala).FirstOrDefaultAsync(m => m.ReserveID == id);

            if (reserve == null)
            {
                return NotFound();
            }

            return Ok(reserve);
        }

        // POST: Reserves
        [HttpPost]
        public async Task<ActionResult<Reserves>> CreateReserve(Reserves reserve)
        {
            _context.Reserves.Add(reserve);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReserve", new { id = reserve.ReserveID }, reserve);
        }

        // PUT: Reserves/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReserve(int id, Reserves reserve)
        {
            if (id != reserve.ReserveID)
            {
                return BadRequest();
            }

            _context.Entry(reserve).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReserveExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: Reserves/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReserve(int id)
        {
            var reserve = await _context.Reserves.FindAsync(id);
            if (reserve == null)
            {
                return NotFound();
            }

            _context.Reserves.Remove(reserve);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReserveExists(int id)
        {
            return _context.Reserves.Any(e => e.ReserveID == id);
        }
    }
}
