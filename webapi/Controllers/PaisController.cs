﻿using Microsoft.AspNetCore.Mvc;
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

        private bool PaisExists(int id)
        {
            return _context.Pais.Any(e => e.CountryID == id);
        }
    }
}

