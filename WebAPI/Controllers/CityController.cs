using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;    

        public CityController( IUnitOfWork uow, IMapper mapper )
        {
            this.uow = uow;
            this.mapper = mapper;
        }
        // GET: api/City
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
           var cities = await uow.CityRepository.GetCitiesAsync();

            var citiesDto = mapper.Map<IEnumerable<CityDto>>(cities);

            return Ok(citiesDto);
        }


        [HttpPost("post")]
        //Post api/city/post --Post the data in Json Format

        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = mapper.Map<City>(cityDto);

            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;
            //var city = new City
            //{
            //    Name = cityDto.Name,
            //    LastUpdatedBy = 1,
            //    LastUpdatedOn = DateTime.Now
            //};

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

