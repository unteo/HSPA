using System.ComponentModel.DataAnnotations;
using WebAPI.Validators;

namespace WebAPI.Dtos
{
    public class CityDto
    {
        public int Id { get; set; }

        [Required (ErrorMessage = "Name is mandatory field")]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(".*[a-zA-Z]+.*", ErrorMessage = "Only numerics are not allowed")]
        [EvenLenghtValidator(ErrorMessage = "The length of the string must be even.")]
        [CityLongerThanCountry(ErrorMessage = "City name must be longer than country name.")]

        public string Name { get; set; }

        [Required]

        public string Country { get; set; }
    }
}
