using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using webapi.Models;
using webapi.Areas.Identity.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;
using System.Security.Claims;

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

            // Actualizar el valor del campo "Rol" de acuerdo a la asignación o remoción del rol "Administrador"
            if (user.Rol)
            {
                // Si el campo "Rol" es true, agregar el rol "Administrador" al usuario
                var addToRoleResult = await _userManager.AddToRoleAsync(existingUser, "Administrador");
                if (!addToRoleResult.Succeeded)
                {
                    return BadRequest(addToRoleResult.Errors);
                }

                // Actualizar el campo "Rol" en la entidad webapiUser a true
                existingUser.Rol = true;
            }
            else
            {
                // Si el campo "Rol" es false, quitar el rol "Administrador" del usuario (si lo tiene)
                var removeFromRoleResult = await _userManager.RemoveFromRoleAsync(existingUser, "Administrador");
                if (!removeFromRoleResult.Succeeded)
                {
                    return BadRequest(removeFromRoleResult.Errors);
                }

                // Actualizar el campo "Rol" en la entidad webapiUser a false
                existingUser.Rol = false;
            }

            var updateResult = await _userManager.UpdateAsync(existingUser);
            if (updateResult.Succeeded)
            {
                return NoContent();
            }

            return BadRequest(updateResult.Errors);
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

        // POST: api/ApplicationUsers/ChangeUsername
        [HttpPost("ChangeUsername")]
        public async Task<IActionResult> ChangeUsername(ChangeUsername model)
        {
            var user = await _userManager.FindByNameAsync(model.CurrentUsername);
            if (user == null)
            {
                return BadRequest("Usuari no trobat.");
            }

            var isExistingUser = await _userManager.FindByNameAsync(model.NewUsername);
            if (isExistingUser != null)
            {
                return BadRequest("El nou nom d'usuari ja existeix.");
            }

            user.UserName = model.NewUsername;
            var updateResult = await _userManager.UpdateAsync(user);
            if (updateResult.Succeeded)
            {
                return NoContent();
            }
            return BadRequest(updateResult.Errors);
        }

        // POST: api/ApplicationUsers/ChangeEmail
        [HttpPost("ChangeEmail")]
        public async Task<IActionResult> ChangeEmail(ChangeEmail model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest("Usuari no trobat.");
            }

            var isExistingEmail = await _userManager.FindByEmailAsync(model.NewEmail);
            if (isExistingEmail != null)
            {
                return BadRequest("El nou correu electrònic ja existeix.");
            }

            user.Email = model.NewEmail;
            var updateResult = await _userManager.UpdateAsync(user);
            if (updateResult.Succeeded)
            {
                return NoContent();
            }
            return BadRequest(updateResult.Errors);
        }

        // POST: api/ApplicationUsers/AssignCountry
        [HttpPost("AssignCountry")]
        public async Task<IActionResult> AssignCountry(AssignCountry model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return BadRequest("Usuari no trobat.");
            }

            // Asigna el país directamente a la propiedad "Pais" del usuario
            user.Pais = model.Country;

            var updateResult = await _userManager.UpdateAsync(user);
            if (updateResult.Succeeded)
            {
                return NoContent();
            }
            return BadRequest(updateResult.Errors);
        }


        // POST: api/ApplicationUsers/AssignOffice
        [HttpPost("AssignOffice")]
        public async Task<IActionResult> AssignOffice(AssignOffice model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return BadRequest("Usuari no trobat.");
            }

            // Asigna la oficina directamente a la propiedad "Oficina" del usuario
            user.Oficina = model.Office;

            var updateResult = await _userManager.UpdateAsync(user);
            if (updateResult.Succeeded)
            {
                return NoContent();
            }
            return BadRequest(updateResult.Errors);
        }
    }
}
