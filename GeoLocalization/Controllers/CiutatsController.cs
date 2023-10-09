using GeoLocalization.Data;
using GeoLocalization.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GeoLocalization.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CiutatsController : ControllerBase
    {
        private readonly GeoLocalizationContext _context;

        public CiutatsController(GeoLocalizationContext context)
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


        //UPDATE: proba 


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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCiutat(int id, Ciutats ciutat)
        {
            if (id != ciutat.CityID)
            {
                return BadRequest();
            }

            var ciutatActual = await _context.Ciutats.FindAsync(id);

            if (ciutatActual == null)
            {
                return NotFound();
            }

            var pais = await _context.Pais.FirstOrDefaultAsync(p => p.NomPais == ciutat.pais.NomPais);

            if (pais == null)
            {
                return NotFound("El país especificado no existe");
            }

            ciutatActual.NomCiutat = ciutat.NomCiutat;
            ciutatActual.CountryID = pais.CountryID;

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





        private bool CiutatsExists(int id)
        {
            return _context.Ciutats.Any(e => e.CityID == id);
        }
    }
}
