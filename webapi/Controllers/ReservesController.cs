using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservesController : ControllerBase
    {
        private readonly webapiContext _context;
        private readonly EmailService _emailService;

        public ReservesController(webapiContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
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

            var reserva = new Reserves
            {
                MeetingRoomID = sala.MeetingRoomID,
                DataReserva = dataReservaDateTime,
                HoraInici = horaIniciTimeSpan,
                HoraFi = horaFiTimeSpan,
                UserID = userId
            };

            _context.Reserves.Add(reserva);
            await _context.SaveChangesAsync();

            // Envía el correo de confirmación
            var userEmail = ObtenerEmailPorUserId(userId);

            var body = @"<!DOCTYPE html>
                        <html lang=""es"">
                        <head>
                            <meta charset=""UTF-8"">
                            <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                            <title>Confirmación de Reserva</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    color: #202067; /* Texto en color azul oscuro */
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    padding: 20px;
                                    background-color: #f9f9f9;
                                    border-radius: 10px;
                                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                                }
                                .header img {
                                    max-width: 100%;
                                    height: auto;
                                    display: block;
                                    margin: 0 auto;
                                }
                                .details {
                                    margin-top: 20px;
                                    text-align: left;
                                }
                                .details h3 {
                                    margin: 10px 0;
                                    font-size: 18px;
                                    color: #202067;
                                }
                                .footer img {
                                    max-width: 100%;
                                    height: auto;
                                    display: block;
                                    margin: 20px auto 0;
                                }
                                h2 {
                                    color: green;
                                }
                            </style>
                        </head>
                        <body>
                            <div class=""container"">
                                <div class=""header"">
                                    <img src=""https://i.imgur.com/U6hSDAJ.png"" alt=""Portada"" width=""100%"">
                                    <h2>La teva reserva ha sigut creada i confirmada amb èxit.✔</h2>
                                </div>
                                <div class=""details"">
                                    <h3><b>● Sala:</b> " + sala.NomSala + @"</h3>
                                    <h3><b>● Data de Reserva:</b> " + dataReservaDateTime.ToShortDateString() + @"</h3>
                                    <h3><b>● Hora d'Inici:</b> " + horaIniciTimeSpan + @"</h3>
                                    <h3><b>● Hora de Fi:</b> " + horaFiTimeSpan + @"</h3>
                                </div>
                                <div class=""footer"">
                                    <img src=""https://i.imgur.com/kj6hX9K.png"" alt=""Footer"" width=""100%"">
                                </div>
                            </div>
                        </body>
                        </html>";

            _emailService.SendEmail(userEmail, "Confirmació de reserva", body);

            return CreatedAtAction("GetReserve", new { id = reserva.ReserveID }, reserva);
        }

        private string ObtenerEmailPorUserId(string userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            return user?.Email;
        }

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
            var reserve = await _context.Reserves.FindAsync(id);

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
