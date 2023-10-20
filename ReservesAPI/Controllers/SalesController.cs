using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservesAPI.Data;
using ReservesAPI.Models;
using Microsoft.Extensions.Options;
using static System.Net.Mime.MediaTypeNames;

namespace ReservesAPI.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class SalesController : ControllerBase
    {
        private readonly ReservesAPIContext _context;

        public SalesController(ReservesAPIContext context)
        {
            _context = context;
        }

        [HttpGet("{officeID}")]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesByOfficeID(int officeID)
        {
            var sales = await _context.Sales.Where(s => s.OfficeID == officeID).ToListAsync();
            return Ok(sales);
        }

        // GET: Sales
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSales()
        {
            var sales = await _context.Sales.ToListAsync();
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

        
      /*  [HttpPost("Pais/{nomPais}/Ciutats/{nomCiutat}/Oficines/{nomOficina}/Sales/{nomSala}")]
        public async Task<ActionResult<Sales>> CreateSalesByNom(string nomPais, string nomCiutat, string nomOficina, string nomSala)
        {
            var pais = await _context.Pais.FirstOrDefaultAsync(p => p.NomPais == nomPais);

            if (pais == null)
            {
                return NotFound("El país no existeix");
            }

            var ciutat = await _context.Ciutats.FirstOrDefaultAsync(c => c.NomCiutat == nomCiutat && c.CountryID == pais.CountryID);

            if (ciutat == null)
            {
                return NotFound("La ciutat no existeix en aquest país");
            }

            var oficina = await _context.Oficines.FirstOrDefaultAsync(o => o.NomOficina == nomOficina && o.CityID == ciutat.CityID);

            if (oficina == null)
            {
                return NotFound("La oficina no existeix en aquesta ciutat");
            }

            var novaSala = new Sales
            {
                NomSala = nomSala,
                OfficeID = oficina.OfficeID,
            };

            _context.Sales.Add(novaSala);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOficina", new { id = novaSala.MeetingRoomID }, novaSala);
        }
    */

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


        // DELETE: Sales/nom/{nomSala}
        [HttpDelete("nom/{nomSala}")]
        public async Task<IActionResult> DeleteSalesByNom(string nomSala)
        {
            var sala = await _context.Sales.FirstOrDefaultAsync(o => o.NomSala == nomSala);
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
