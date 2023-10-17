using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservesAPI.Data;
using ReservesAPI.Models;
using Mjml.Net;
using Microsoft.Extensions.Options;
using static System.Net.Mime.MediaTypeNames;

namespace ReservesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservesController : ControllerBase
    {
        private readonly ReservesAPIContext _context;
        private readonly EmailService _emailService;

        public ReservesController(ReservesAPIContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // GET: Reserves
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reserves>>> GetReserves()
        {
            var reserves = await _context.Reserva.Include(r => r.Sala).ToListAsync();
            return Ok(reserves);
        }

        // GET: Reserves/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reserves>> GetReserve(int id)
        {
            var reserve = await _context.Reserva.Include(r => r.Sala).FirstOrDefaultAsync(m => m.ReserveID == id);

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

      /*  [HttpPost("FerReserva/{meetingRoomID}/{dataReserva}/{horaInici}/{horaFi}/{userId}")]
        public async Task<IActionResult> CreateReserva(int meetingRoomID, string dataReserva, string horaInici, string horaFi, string userId)
        {
            if (!DateTime.TryParse(dataReserva, out DateTime dataReservaDateTime) ||
                !TimeSpan.TryParse(horaInici, out TimeSpan horaIniciTimeSpan) ||
                !TimeSpan.TryParse(horaFi, out TimeSpan horaFiTimeSpan))
            {
                return BadRequest("Els valors de data i hora no són correctes.");
            }

            var sala = await _context.Sala.FirstOrDefaultAsync(s => s.MeetingRoomID == meetingRoomID);
            if (sala == null)
            {
                return NotFound("No se ha encontrado ninguna sala con la ID especificada.");
            }

            var reserva = new Reserves
            {
                MeetingRoomID = sala.MeetingRoomID,
                DataReserva = dataReservaDateTime,
                HoraInici = horaIniciTimeSpan,
                HoraFi = horaFiTimeSpan,
                UserID = userId
            };

            _context.Reserva.Add(reserva);
            await _context.SaveChangesAsync();

            // Envía el correo de confirmación
            var userEmail = ObtenerEmailPorUserId(userId);

            var mjmlRenderer = new MjmlRenderer();
            var correu = System.IO.File.ReadAllText("./Emails/confirmacio_reserva.mjml");

            correu = correu.Replace("{NomSala}", sala.NomSala);
            correu = correu.Replace("{DataReserva}", dataReservaDateTime.ToShortDateString());
            correu = correu.Replace("{HoraInici}", horaIniciTimeSpan.ToString());
            correu = correu.Replace("{HoraFi}", horaFiTimeSpan.ToString());

            var options = new MjmlOptions
            {
                Beautify = false
            };

            var (html, errors) = mjmlRenderer.Render(correu, options);

            _emailService.SendEmail(userEmail, "Confirmació de reserva", html);

            return CreatedAtAction("GetReserve", new { id = reserva.ReserveID }, reserva);
         
        }

        //!!!!! FK A USERS 
        private string ObtenerEmailPorUserId(string userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            return user?.Email;
        }
       

    */




        /* // PUT: Reserves/5
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

         */

        [HttpPut("{id}/{novaHoraInici}/{novaHoraFi}/{novaDataReserva}")]
        public async Task<IActionResult> UpdateReserve(int id, string novaHoraInici, string novaHoraFi, string novaDataReserva)
        {
            var reserve = await _context.Reserva.FindAsync(id);

            if (reserve == null)
            {
                return NotFound();
            }

            // Només actualitza els camps si s'han proporcionat
            if (!string.IsNullOrEmpty(novaHoraInici))
            {
                reserve.HoraInici = TimeSpan.Parse(novaHoraInici);
            }

            if (!string.IsNullOrEmpty(novaHoraFi))
            {
                reserve.HoraFi = TimeSpan.Parse(novaHoraFi);
            }

            if (!string.IsNullOrEmpty(novaDataReserva))
            {
                reserve.DataReserva = DateTime.Parse(novaDataReserva);
            }

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
            var reserves = await _context.Reserva
                .Where(r => r.UserID == userId)
                .Include(r => r.Sala)
                .ToListAsync();

            return Ok(reserves);
        }

        // DELETE: Reserves/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReserve(int id)
        {
            var reserve = await _context.Reserva.FindAsync(id);
            if (reserve == null)
            {
                return NotFound();
            }

            _context.Reserva.Remove(reserve);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReserveExists(int id)
        {
            return _context.Reserva.Any(e => e.ReserveID == id);
        }

    }
}
