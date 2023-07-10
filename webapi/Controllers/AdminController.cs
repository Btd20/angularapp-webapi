using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using webapi.Areas.Identity.Data;

namespace webapi.Controllers
{
    [Authorize(Roles = "Administrador")]
    public class AdminController : Controller
    {
        private readonly UserManager<webapiUser> _userManager;

        public AdminController(UserManager<webapiUser> userManager)
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
    }
}
