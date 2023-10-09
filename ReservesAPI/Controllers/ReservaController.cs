using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservesAPI.Data;
using ReservesAPI.Models;
//using Mjml.Net;
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

        //AQUESTES PETICIONS PETEN PERQUE NECESITEN L'ALTRE MICROSERVEI.

        /*
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
        */


    }
}
