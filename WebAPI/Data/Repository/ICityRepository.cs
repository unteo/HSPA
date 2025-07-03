﻿using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Data.Repository
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetCitiesAsync();

        void AddCity(City city);

        void DeleteCity(int cityId);

        Task<bool> SaveAsync();  
    }

}
