using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace StockManagerApi.Models
{
    public class Article
    {
        public int Id { get; set; }
        public int Id_Reference { get; set; }
        public int Id_Warehouse { get; set; }
        public DateTime? Expiration { get; set; }
    }
}