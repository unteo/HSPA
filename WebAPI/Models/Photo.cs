﻿namespace WebAPI.Models
{
    public class Photo
    {
        public int Id { get; set; }

        public string ImageUrl { get; set; }

        public bool IsPrimary { get; set; }
    }
}