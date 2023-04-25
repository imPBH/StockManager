using System.ComponentModel.DataAnnotations.Schema;

namespace StockManagerApi.Models
{
    public class CompanyReference
    {
        public int Id { get; set; }
        public int Id_Company { get; set; }
        public int Id_Reference { get; set; }

        [ForeignKey("Id_Company")]
        public Company Company { get; set; }

        [ForeignKey("Id_Reference")]
        public ItemReference Reference { get; set; }

    }
}
