using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using webapi.Models;
using webapi.Areas.Identity.Data;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUsersController : ControllerBase
    {
        private readonly UserManager<webapiUser> _userManager;

        public ApplicationUsersController(UserManager<webapiUser> userManager)
        {
            _userManager = userManager;
        }

        // GET: api/ApplicationUsers
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _userManager.Users;
            return Ok(users);
        }

        // GET: api/ApplicationUsers/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST: api/ApplicationUsers
        [HttpPost]
        public async Task<IActionResult> CreateUser(webapiUser user)
        {
            var result = await _userManager.CreateAsync(user);
            if (result.Succeeded)
            {
                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
            }
            return BadRequest(result.Errors);
        }

        // PUT: api/ApplicationUsers/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, webapiUser user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            var existingUser = await _userManager.FindByIdAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.UserName = user.UserName;
            existingUser.Email = user.Email;

            var result = await _userManager.UpdateAsync(existingUser);
            if (result.Succeeded)
            {
                return NoContent();
            }
            return BadRequest(result.Errors);
        }

        // DELETE: api/ApplicationUsers/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                return NoContent();
            }
            return BadRequest(result.Errors);
        }

        // GET: api/ApplicationUsers/{id}/role
        [HttpGet("{id}/role")]
        public async Task<IActionResult> GetUserRole(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var roles = await _userManager.GetRolesAsync(user);
            if (roles.Count == 0)
            {
                return NotFound("El usuari no és Administrador.");
            }

            var role = roles[0]; // Suponemos que el usuario tiene un solo rol asignado

            return Ok(role);
        }

        // POST: api/ApplicationUsers/ChangePassword
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePassword model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return BadRequest("Usuari no trobat.");
            }

            var changePasswordResult = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            if (!changePasswordResult.Succeeded)
            {
                return BadRequest(changePasswordResult.Errors);
            }

            // Si deseas iniciar sesión automáticamente después de cambiar la contraseña, puedes agregar lo siguiente:
            // await _signInManager.SignInAsync(user, isPersistent: false);

            return NoContent();
        }
    }
}
