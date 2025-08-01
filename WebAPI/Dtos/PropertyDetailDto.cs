using System;
using WebAPI.Models;

namespace WebAPI.Dtos
{
    public class PropertyDetailDto : PropertyListDto
    {
        public int CarpetArea {  get; set; }
        public int SellRent { get; set; }
        public string MainEntrance { get; set; }
        public int Security { get; set; }
        public bool Gated { get; set; }
        public int Maintenance { get; set; }
        public DateTime EstPossessionOn { get; set; }
        public int Age { get; set; }
        public string Description { get; set; }
    }
}