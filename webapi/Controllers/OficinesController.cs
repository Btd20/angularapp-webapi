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
    public class OficinesController : ControllerBase
    {
        private readonly webapiContext _context;

        public OficinesController(webapiContext context)
        {
            _context = context;
        }

        // GET: Oficines
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Oficines>>> GetOficines()
        {
            var oficines = await _context.Oficines.Include(o => o.ciutat).ToListAsync();
            return Ok(oficines);
        }

        // GET: Oficines/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Oficines>> GetOficina(int id)
        {
            var oficina = await _context.Oficines.Include(o => o.ciutat).FirstOrDefaultAsync(m => m.OfficeID == id);

            if (oficina == null)
            {
                return NotFound();
            }

            return Ok(oficina);
        }



        //GET: Oficines->Sales
        [HttpGet("pais/{nomPais}/ciutats/{nomCiutat}/oficines/{nomOficina}/sales")]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesByOficines(string nomPais, string nomCiutat, string nomOficina)
        {;
            var sales = await _context.Sales
                .Include(o => o.oficina.ciutat.pais)
                .Where(o => o.oficina.ciutat.pais.NomPais.Contains(nomPais) && o.oficina.ciutat.NomCiutat.Contains(nomCiutat)&& o.oficina.NomOficina.Contains(nomOficina))
                .ToListAsync();

            return Ok(sales);
        }


        // POST: Oficines
        [HttpPost]
        public async Task<ActionResult<Oficines>> CreateOficina(Oficines oficina)
        {
            _context.Oficines.Add(oficina);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOficina", new { id = oficina.OfficeID }, oficina);
        }

        // POST: Oficines/createOficinesByName
        [HttpPost("Pais/{nomPais}/Ciutats/{nomCiutat}/Oficines/{nomOficina}")]
        public async Task<ActionResult<Oficines>> CreateOficinesByNom(string nomPais, string nomCiutat, string nomOficina)
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

            var novaOficina = new Oficines
            {
                NomOficina = nomOficina,
                CityID = ciutat.CityID
            };

            _context.Oficines.Add(novaOficina);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOficina", new { id = novaOficina.OfficeID }, novaOficina);
        }




        // PUT: Oficines/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOficina(int id, Oficines oficina)
        {
            if (id != oficina.OfficeID)
            {
                return BadRequest();
            }

            _context.Entry(oficina).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OficinaExists(id))
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

   

        // DELETE: Oficines/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOficina(int id)
        {
            var oficina = await _context.Oficines.FindAsync(id);
            if (oficina == null)
            {
                return NotFound();
            }

            _context.Oficines.Remove(oficina);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // DELETE: Oficina/nom/{nomOficina}
        [HttpDelete("nom/{nomOficina}")]
        public async Task<IActionResult> DeleteOficinesByNom(string nomOficina)
        {
            var oficina = await _context.Oficines.FirstOrDefaultAsync(o => o.NomOficina == nomOficina);
            if (oficina == null)
            {
                return NotFound();
            }

            _context.Oficines.Remove(oficina);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool OficinaExists(int id)
        {
            return _context.Oficines.Any(e => e.OfficeID == id);
        }
    }
}
