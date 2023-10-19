using GeoLocalization.Data;
using GeoLocalization.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GeoLocalization.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OficinesController : ControllerBase
    {
        private readonly GeoLocalizationContext _context;

        public OficinesController(GeoLocalizationContext context)
        {
            _context = context;
        }

        // GET: Oficines
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Oficines>>> GetOficines()
        {
            var oficines = await _context.Oficines.Include(o => o.ciutat).ThenInclude(c => c.pais).ToListAsync();
            return Ok(oficines);
        }

        // GET: Oficines/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Oficines>> GetOficina(int id)
        {
            var oficina = await _context.Oficines.Include(o => o.ciutat).ThenInclude(c => c.pais).FirstOrDefaultAsync(m => m.OfficeID == id);

            if (oficina == null)
            {
                return NotFound();
            }

            return Ok(oficina);
        }



        /*//GET: Oficines->Sales   //ES PASSA ID OFICINA, PENSA-HO GEMMI

        [HttpGet("pais/{nomPais}/ciutats/{nomCiutat}/oficines/{nomOficina}/sales")]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesByOficines(string nomPais, string nomCiutat, string nomOficina)
        {
            ;
            var sales = await _context.Sales
                .Include(o => o.oficina.ciutat.pais)
                .Where(o => o.oficina.ciutat.pais.NomPais.Contains(nomPais) && o.oficina.ciutat.NomCiutat.Contains(nomCiutat) && o.oficina.NomOficina.Contains(nomOficina))
                .ToListAsync();

            return Ok(sales);
        }
      */


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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOficina(int id, Oficines updatedOficina)
        {
            if (id != updatedOficina.OfficeID)
            {
                return BadRequest();
            }



            var oficina = await _context.Oficines.Include(o => o.ciutat).FirstOrDefaultAsync(o => o.OfficeID == id);

            if (oficina == null)
            {
                return NotFound();
            }


            oficina.NomOficina = updatedOficina.NomOficina;
            oficina.CityID = updatedOficina.CityID;

            oficina.ciutat.NomCiutat = updatedOficina.ciutat.NomCiutat;
            oficina.ciutat.CountryID = updatedOficina.ciutat.CountryID;

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

            return NoContent(); // Retorna un codi 204 No Content per indicar que s'ha actualitzat correctament
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

  

        [HttpGet("{id}/geolocation")]
        public async Task<ActionResult<object>> GetGeolocationByOficinaId(int id)
        {
            var oficina = await _context.Oficines
                .Include(o => o.ciutat.pais)
                .FirstOrDefaultAsync(m => m.OfficeID == id);

            if (oficina == null)
            {
                return NotFound();
            }

            var geolocationData = new
            {
                pais = oficina.ciutat.pais.NomPais,
                ciutat = oficina.ciutat.NomCiutat,
                oficina = oficina.NomOficina
            };

            return Ok(geolocationData);
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
