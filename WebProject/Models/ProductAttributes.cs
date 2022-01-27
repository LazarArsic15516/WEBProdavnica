using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebProject.Models 
{
    [Table("Attributes")]
    public class ProductAttributes
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }

        [Column("Key")]
        public string Key { get; set; }//

        [Column("Value")]
        public string Value { get; set; }

        [Column("fk_product_id")]
        public Product Product { get; set; }
    }
}