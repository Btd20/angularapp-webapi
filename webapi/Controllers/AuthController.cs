using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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
        private readonly IConfiguration _configuration;

        public AuthController(UserManager<webapiUser> userManager, SignInManager<webapiUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if (user == null)
            {
                return NotFound("L'usuari no existeix.");
            }

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, isPersistent: model.RememberMe, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                return BadRequest("Error d'inici de sessió. Verifica les teves credencials.");
            }

            var token = GenerateJwtToken(user);
            return Ok(new { token });
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
                return BadRequest("Error al registrar l'usuari.");
            }

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        private async Task<string> GenerateJwtToken(webapiUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim("UserId", user.Id),
        // Agrega más claims según tus necesidades
    };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var tokenOptions = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1), // Token válido por 1 hora
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])),
                    SecurityAlgorithms.HmacSha256)
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            // Asignar el token al usuario en la tabla AspNetUserTokens
            await _userManager.SetAuthenticationTokenAsync(user, "webapi", "acmetoken", tokenString);

            return tokenString;
        }
    }
}
