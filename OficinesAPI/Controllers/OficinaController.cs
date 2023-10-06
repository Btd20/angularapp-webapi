
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OficinesAPI.Data;
using OficinesAPI.Models;

namespace OficinesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OficinesController : ControllerBase
    {
        private readonly OficinesAPIContext _context;

        public OficinesController(OficinesAPIContext context)
        {
            _context = context;
        }

        // GET: Oficines
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Oficina>>> GetOficines()
        {
            var oficines = await _context.Oficines.Include(o => o.ciutat).ThenInclude(c => c.pais).ToListAsync();
            return Ok(oficines);
        }
    }
}