using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class GeoIpController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;

    public GeoIpController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    [HttpGet("{ipAddress}")]
    public async Task<IActionResult> GetGeoInfo(string ipAddress)
    {
        var client = _httpClientFactory.CreateClient();

        
        var response = await client.GetStringAsync($"http://ip-api.com/json/{ipAddress}");

        return Ok(response);
    }
}
