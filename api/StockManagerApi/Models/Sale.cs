using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace StockManagerApi.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public int Id_Company { get; set; }
        public DateTime Created_at { get; set; }

        [ForeignKey("Id_Company")]
        public Company Company { get; set; }
    }
}
