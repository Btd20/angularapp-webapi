using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using webapi.Models;
using webapi.Areas.Identity.Data;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<webapiUser> _userManager;
        private readonly SignInManager<webapiUser> _signInManager;

        public AuthController(UserManager<webapiUser> userManager, SignInManager<webapiUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if (user == null)
            {
                return NotFound("El usuario no existe.");
            }

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, isPersistent: model.RememberMe, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                return BadRequest("Error de inicio de sesión. Verifica tus credenciales.");
            }

            // Aquí puedes generar un token JWT u otra lógica de autenticación si es necesario

            return Ok("Inicio de sesión exitoso.");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var user = new webapiUser
            {
                UserName = model.Username,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest("Error al registrar el usuario.");
            }

            // Aquí puedes generar un token JWT u otra lógica de autenticación si es necesario

            return Ok("Registro exitoso.");
        }
    }
}

