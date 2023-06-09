﻿using System.ComponentModel.DataAnnotations.Schema;

namespace StockManagerApi.Models
{
    public class UserCompany
    {
        public int Id { get; set; }
        public int Id_User { get; set; }
        public int Id_Company { get; set; }

        [ForeignKey("Id_Company")]
        public Company Company { get; set; }

        [ForeignKey("Id_User")]
        public User User { get; set; }
    }
}
