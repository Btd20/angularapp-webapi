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
        public async Task<ActionResult<Reserves>> CreateReservations(Reserves reserve)
        {
            _context.Reserves.Add(reserve);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReserve", new { id = reserve.ReserveID }, reserve);
        }

        // POST: CrearReserves
        [HttpPost("CreateReserva")]
        public async Task<IActionResult> CreateReserva(string nomSala, string dataReserva, string horaInici, string horaFi)
        {
            // Convertir las cadenas de fecha y hora a objetos DateTime
            DateTime dataReservaDateTime, horaIniciDateTime, horaFiDateTime;
            if (!DateTime.TryParse(dataReserva, out dataReservaDateTime) ||
                !DateTime.TryParse(horaInici, out horaIniciDateTime) ||
                !DateTime.TryParse(horaFi, out horaFiDateTime))
            {
                return BadRequest("Los valores de fecha y hora no están en el formato correcto.");
            }

            var sala = await _context.Sales.FirstOrDefaultAsync(s => s.NomSala == nomSala);
            if (sala == null)
            {
                return NotFound("No se ha encontrado ninguna sala con el nombre especificado.");
            }

            var reserva = new Reserves
            {
                MeetingRoomID = sala.MeetingRoomID,
                DataReserva = dataReservaDateTime,
                HoraInici = horaIniciDateTime,
                HoraFi = horaFiDateTime,
            };

            _context.Reserves.Add(reserva);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReserva", new { id = reserva.ReserveID }, reserva);
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
