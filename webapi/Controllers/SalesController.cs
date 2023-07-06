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
    public class SalesController : ControllerBase
    {
        private readonly webapiContext _context;

        public SalesController(webapiContext context)
        {
            _context = context;
        }

        // GET: Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSales()
        {
            var sales = await _context.Sales.Include(o => o.oficina).ToListAsync();
            return Ok(sales);
        }

        // GET: Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Oficines>> GetOficina(int id)
        {
            var sales = await _context.Sales.Include(o => o.oficina).FirstOrDefaultAsync(m => m.MeetingRoomID == id);

            if (sales == null)
            {
                return NotFound();
            }

            return Ok(sales);
        }

        // POST: Sales
        [HttpPost]
        public async Task<ActionResult<Sales>> CreateSales(Sales sala)
        {
            _context.Sales.Add(sala);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSales", new { id = sala.MeetingRoomID }, sala);
        }

        // PUT: Sales/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSales(int id, Sales sala)
        {
            if (id != sala.MeetingRoomID)
            {
                return BadRequest();
            }

            _context.Entry(sala).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesExists(id))
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

        // DELETE: Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSales(int id)
        {
            var sala = await _context.Sales.FindAsync(id);
            if (sala == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sala);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.MeetingRoomID == id);
        }
    }
}
