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
    public class PaisController : ControllerBase
    {
        private readonly webapiContext _context;

        public PaisController(webapiContext context)
        {
            _context = context;
        }

        // GET: Pais
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pais>>> GetPaises()
        {
            var paises = await _context.Pais.ToListAsync();
            return Ok(paises);
        }

        // GET: Pais/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pais>> GetPais(int id)
        {
            var pais = await _context.Pais.FindAsync(id);

            if (pais == null)
            {
                return NotFound();
            }

            return Ok(pais);
        }

        // GET: Pais/nom/{nomPais}
        [HttpGet("nom/{nomPais}")]
        public async Task<ActionResult<IEnumerable<Pais>>> GetPaisesByNom(string nomPais)
        {
            var paises = await _context.Pais
                .Where(p => p.NomPais.Contains(nomPais))
                .ToListAsync();

            return Ok(paises);
        }

        [HttpGet("{id}/Ciutats")]
        public async Task<ActionResult<IEnumerable<Ciutats>>> GetCiutatsByPais(int id)
        {
            var ciutats = await _context.Ciutats
                .Where(c => c.CountryID == id)
                .ToListAsync();

            if (ciutats == null || ciutats.Count == 0)
            {
                return NotFound("No s'han trobat ciutats per aquest país.");
            }

            return Ok(ciutats);
        }

        // POST: Pais
        [HttpPost]
        public async Task<ActionResult<Pais>> CreatePais(Pais pais)
        {
            _context.Pais.Add(pais);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPais", new { id = pais.CountryID }, pais);
        }

        // PUT: Pais/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePais(int id, Pais pais)
        {
            if (id != pais.CountryID)
            {
                return BadRequest();
            }

            _context.Entry(pais).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaisExists(id))
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

        [HttpPut("nom/{nomPais}")]
        public async Task<IActionResult> UpdatePaisByNom(string nomPais, Pais pais)
        {
            var paisToUpdate = await _context.Pais.FirstOrDefaultAsync(p => p.NomPais == nomPais);

            if (paisToUpdate == null)
            {
                return NotFound();
            }

            paisToUpdate.NomPais = pais.NomPais;

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest("Error al actualizar el país: " + ex.Message);
            }
        }




        // DELETE: Pais/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePais(int id)
        {
            var pais = await _context.Pais.FindAsync(id);
            if (pais == null)
            {
                return NotFound();
            }

            _context.Pais.Remove(pais);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: Pais/nom/{nomPais}
        [HttpDelete("nom/{nomPais}")]
        public async Task<IActionResult> DeletePaisByNom(string nomPais)
        {
            var pais = await _context.Pais.FirstOrDefaultAsync(p => p.NomPais == nomPais);
            if (pais == null)
            {
                return NotFound();
            }

            _context.Pais.Remove(pais);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        private bool PaisExists(int id)
        {
            return _context.Pais.Any(e => e.CountryID == id);
        }
    }
}

