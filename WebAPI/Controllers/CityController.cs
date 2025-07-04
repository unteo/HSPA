using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        
        private readonly IUnitOfWork uow;

        public CityController( IUnitOfWork uow)
        {
            this.uow = uow;
        }
        // GET: api/City
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
           var cities = await uow.CityRepository.GetCitiesAsync();
            return Ok(cities);
        }


        [HttpPost("post")]
        //Post api/city/post --Post the data in Json Format

        public async Task<IActionResult> AddCity(City city)
        {

            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpDelete("delete/{id}")]

        public async Task<IActionResult> DeleteCity(int id)
        {
            uow.CityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }

    //Post api/city/add?cityname=Miami
    //Post api/city/add/Los Angeles
    //[HttpPost("add")]
    //[HttpPost("add/{cityName}")]

    //public async Task<IActionResult> AddCity(string cityName)
    //{
    //    City city = new City();
    //    city.Name = cityName;
    //    await dc.Cities.AddAsync(city);
    //    await dc.SaveChangesAsync();
    //    return Ok(city);
    //}
}

