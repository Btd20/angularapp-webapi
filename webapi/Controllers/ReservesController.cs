using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
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

        /*  // POST: Reserves
          [HttpPost]
          public async Task<ActionResult<Reserves>> CreateReservations(Reserves reserve)
          {
              _context.Reserves.Add(reserve);
              await _context.SaveChangesAsync();

              return CreatedAtAction("GetReserve", new { id = reserve.ReserveID }, reserve);
          }
        */

        [HttpPost("FerReserva/{meetingRoomID}/{dataReserva}/{horaInici}/{horaFi}/{userId}")]
        public async Task<IActionResult> CreateReserva(int meetingRoomID, string dataReserva, string horaInici, string horaFi, string userId)
        {
            // Convert the strings to DateTime objects
            if (!DateTime.TryParse(dataReserva, out DateTime dataReservaDateTime) ||
                !TimeSpan.TryParse(horaInici, out TimeSpan horaIniciTimeSpan) ||
                !TimeSpan.TryParse(horaFi, out TimeSpan horaFiTimeSpan))
            {
                return BadRequest("Els valors de data i hora no són correctes.");
            }

            var sala = await _context.Sales.FirstOrDefaultAsync(s => s.MeetingRoomID == meetingRoomID);
            if (sala == null)
            {
                return NotFound("No se ha encontrado ninguna sala con la ID especificada.");
            }

            // Get the user ID of the authenticated user
            /*  string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);*/

            var reserva = new Reserves
            {
                MeetingRoomID = sala.MeetingRoomID,
                DataReserva = dataReservaDateTime,
                HoraInici = horaIniciTimeSpan,
                HoraFi = horaFiTimeSpan,
                UserID = userId // Assigning the user ID to the reservation.
            };

            _context.Reserves.Add(reserva);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReserve", new { id = reserva.ReserveID }, reserva);
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

        [HttpGet("GetReservesByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<Reserves>>> GetReservesByUser(string userId)
        {
            var reserves = await _context.Reserves
                .Where(r => r.UserID == userId)
                .Include(r => r.sala)
                .ToListAsync();

            return Ok(reserves);
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
