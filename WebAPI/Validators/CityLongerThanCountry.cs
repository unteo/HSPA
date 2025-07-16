using System.ComponentModel.DataAnnotations;
using WebAPI.Dtos;

namespace WebAPI.Validators
{
    public class CityLongerThanCountry : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var city = (CityDto)validationContext.ObjectInstance;
            if (city.Name.Length > city.Country.Length)
            {
                return ValidationResult.Success;
            }
            else
            {
                return new ValidationResult("City name must be longer than country name.");
            }
        }
    }

}
