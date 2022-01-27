using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebProject.Models 
{
    [Table("Rates")]
    public class ProductRates
    {   
        [Key]
        [Column("ID")]
        public int Id { get; set; }

        [Column("Rate")]
        [Range(0,5)]
        public double Rate { get; set; }

        [Column("fk_product_id")]
        public Product Product { get; set; }
    }
}