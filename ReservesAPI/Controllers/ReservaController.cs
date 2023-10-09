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

    }

    }
