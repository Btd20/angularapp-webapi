﻿
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace GeoLocalization.Models

{
    public class Pais
    {
        [Key]
        public int CountryID { get; set; }
        public string? NomPais { get; set; }

    }
}


