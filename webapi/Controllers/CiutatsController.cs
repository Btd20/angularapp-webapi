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
    public class CiutatsController : ControllerBase
    {
        private readonly webapiContext _context;

        public CiutatsController(webapiContext context)
        {
            _context = context;
        }

        // GET: Ciutats
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ciutats>>> GetCiutats()
        {
            var ciutats = await _context.Ciutats.Include(o => o.pais).ToListAsync();
            return Ok(ciutats);
        }

        // GET: Ciutats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ciutats>> GetCiutats(int id)
        {
            var ciutats = await _context.Ciutats.Include(o => o.pais).FirstOrDefaultAsync(m => m.CountryID == id);

            if (ciutats == null)
            {
                return NotFound();
            }

            return Ok(ciutats);
        }

        // GET: Ciutats/pais/{nomPais}
        [HttpGet("pais/{nomPais}")]
        public async Task<ActionResult<IEnumerable<Ciutats>>> GetCiutatsByPais(string nomPais)
        {
            var ciutats = await _context.Ciutats
                .Include(o => o.pais)
                .Where(c => c.pais.NomPais.Contains(nomPais))
                .ToListAsync();

            return Ok(ciutats);
        }

        // GET: Join de Ofis a Ciutats 
        [HttpGet("pais/{nomPais}/ciutats/{nomCiutat}/oficines")]
        public async Task<ActionResult<IEnumerable<Oficines>>> GetOficinesByCiudad(string nomPais, string nomCiutat)
        {
            var oficines = await _context.Oficines
                .Include(o => o.ciutat.pais)
                .Where(o => o.ciutat.pais.NomPais.Contains(nomPais) && o.ciutat.NomCiutat.Contains(nomCiutat))
                .ToListAsync();

            return Ok(oficines);
        }



        // POST: Ciutats
        [HttpPost]
        public async Task<ActionResult<Ciutats>> CreateCiutats(Ciutats ciutats)
        {
            _context.Ciutats.Add(ciutats);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCiutats", new { id = ciutats.CityID }, ciutats);

        }

        // POST: Ciutats by name
        [HttpPost("{nomCiutat}")]
        public async Task<ActionResult<Ciutats>> CreateCiutatsByName(string nomPais, string nomCiutat)
        {
            var pais = await _context.Pais.FirstOrDefaultAsync(p => p.NomPais == nomPais);

            if (pais == null)
            {
                return NotFound("El país no existe");
            }

            var ciutat = new Ciutats
            {
                NomCiutat = nomCiutat,
                CountryID = pais.CountryID
            };

            _context.Ciutats.Add(ciutat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCiutats", new { id = ciutat.CityID }, ciutat);
        }


        // PUT: Ciutats/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCiutats(int id, Ciutats ciutats)
        {
            if (id != ciutats.CityID)
            {
                return BadRequest();
            }

            _context.Entry(ciutats).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CiutatsExists(id))
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

        // DELETE: Ciutats/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCiutats(int id)
        {
            var ciutats = await _context.Ciutats.FindAsync(id);
            if (ciutats == null)
            {
                return NotFound();
            }

            _context.Ciutats.Remove(ciutats);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // DELETE: Ciutats/nom/{nomCiutat}
        [HttpDelete("nom/{nomCiutat}")]
        public async Task<IActionResult> DeleteCiutatsByNom(string nomCiutat)
        {
            var ciutats = await _context.Ciutats.FirstOrDefaultAsync(c => c.NomCiutat == nomCiutat);
            if (ciutats == null)
            {
                return NotFound();
            }

            _context.Ciutats.Remove(ciutats);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: Ciutats/nom/{nomCiutat}
        [HttpPut("nom/{nomCiutat}")]
        public async Task<IActionResult> UpdateCiutatsByNom(string nomCiutat, Ciutats ciutats)
        {
            var ciutat = await _context.Ciutats.FirstOrDefaultAsync(c => c.NomCiutat == nomCiutat);
            if (ciutat == null)
            {
                return NotFound();
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CiutatsExists(ciutats.CityID))
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



        private bool CiutatsExists(int id)
        {
            return _context.Ciutats.Any(e => e.CityID == id);
        }
    }
}
