using System.ComponentModel.DataAnnotations;

namespace WebAPI.Validators
{
    public class EvenLenghtValidator : ValidationAttribute
    {

        public override bool IsValid(object value)
        {
            if (value == null)
            {
                return true; 
            }
           var str = value.ToString();
            if (str.Length % 2 == 0)
            {
                return true; 
            }
            else
            {
                ErrorMessage = "The length of the string must be even.";
                return false; 
            }
        }
    }
}
