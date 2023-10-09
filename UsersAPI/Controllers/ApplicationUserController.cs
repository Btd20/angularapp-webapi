using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using UsersAPI.Models;
using UsersAPI.Areas.Identity.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;
using System.Security.Claims;
using System.IO;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;


namespace UsersAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUsersController : ControllerBase
    {
        private readonly UserManager<UsersAPIUser> _userManager;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ApplicationUsersController(UserManager<UsersAPIUser> userManager, IWebHostEnvironment hostEnvironment)
        {
            _userManager = userManager;
            _hostEnvironment = hostEnvironment;
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
        public async Task<IActionResult> CreateUser(UsersAPIUser user)
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
        public async Task<IActionResult> UpdateUser(string id, UsersAPIUser user)
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

            if (user.Rol)
            {
                var addToRoleResult = await _userManager.AddToRoleAsync(existingUser, "Administrador");

                existingUser.Rol = true;
            }
            else if (!user.Rol && existingUser.Rol == true && user.UserName != "superadmin")
            {
                var removeFromRoleResult = await _userManager.RemoveFromRoleAsync(existingUser, "Administrador");
                if (!removeFromRoleResult.Succeeded)
                {
                    return BadRequest(removeFromRoleResult.Errors);
                }

                existingUser.Rol = false;
            }
            else
            {
                return BadRequest("Superadmin es administrador pare");
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

        // POST: api/ApplicationUsers/AssignCity
        [HttpPost("AssignCity")]
        public async Task<IActionResult> AssignCity(AssignCity model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return BadRequest("Usuari no trobat.");
            }

            // Asigna el país directamente a la propiedad "Pais" del usuario
            user.Ciutat = model.City;

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

        //POST: api/ApplicationUsers/{username}/UploadProfileImage
        [HttpPost("{username}/UploadProfileImage")]
        public async Task<IActionResult> UploadProfileImage(string username, IFormFile file)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return BadRequest("Usuario no encontrado.");
            }

            if (file == null || file.Length == 0)
            {
                return BadRequest("No se ha proporcionado una imagen válida.");
            }

            // Convierte la imagen en un array de bytes
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                user.ProfileImage = memoryStream.ToArray();
            }

            // Si la imagen de perfil es NULL, establecer un valor predeterminado (array de bytes vacío)
            if (user.ProfileImage == null)
            {
                user.ProfileImage = new byte[0];
            }

            var updateResult = await _userManager.UpdateAsync(user);
            if (updateResult.Succeeded)
            {
                return NoContent();
            }

            return BadRequest(updateResult.Errors);
        }



        // GET: api/ApplicationUsers/GetProfileImage
        [HttpGet("GetProfileImage/{username}")]
        public async Task<IActionResult> GetProfileImage(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null || user.ProfileImage == null || user.ProfileImage.Length == 0)
            {
                // URL de la imagen predeterminada en Imgur (reemplaza con tu propia URL)
                string defaultImageUrl = "https://i.imgur.com/ct6esaa.png";

                using (var httpClient = new HttpClient())
                {
                    try
                    {
                        // Descargar la imagen desde la URL de Imgur
                        var response = await httpClient.GetAsync(defaultImageUrl);
                        if (response.IsSuccessStatusCode)
                        {
                            // Convertir la imagen descargada a bytes
                            var imageBytes = await response.Content.ReadAsByteArrayAsync();

                            // Devolver la imagen predeterminada en bytes
                            return File(imageBytes, "image/jpeg");
                        }
                    }
                    catch (Exception ex)
                    {
                        // Manejar errores de descarga o conversión
                        // Puedes agregar el registro de errores aquí si lo deseas.
                        // Por ejemplo, ILogger<NombreDeTuControlador> _logger;
                        // _logger.LogError(ex, "Error al obtener la imagen predeterminada desde Imgur.");
                    }

                    // Si hubo un error, puedes devolver una imagen de perfil predeterminada local como respaldo
                    // Puedes cambiar esto para que se ajuste a tus necesidades.
                    var defaultImage = Path.Combine(_hostEnvironment.WebRootPath, "images", "default_profile_image.jpg");
                    return PhysicalFile(defaultImage, "image/jpeg");
                }
            }

            // Si el usuario tiene una imagen de perfil, devolverla
            return File(user.ProfileImage, "image/jpeg");
        }

    }
}
