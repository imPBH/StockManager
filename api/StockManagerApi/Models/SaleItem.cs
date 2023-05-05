using System.ComponentModel.DataAnnotations.Schema;

namespace StockManagerApi.Models
{
    public class SaleItem
    {
        public int Id { get; set; }
        public int Id_Sale { get; set; }
        public int Id_Article { get; set; }

        [ForeignKey("Id_Sale")]
        public Sale Sale { get; set; }

        [ForeignKey("Id_Article")]
        public Article Article { get; set; }
    }
}
