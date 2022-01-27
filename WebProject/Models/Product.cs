using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebProject.Models 
{
    [Table("Products")]
    public class Product
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }

        [Column("TotalAmount")]
        public int TotalAmount { get; set; }

        [Column("AvailableAmount")]
        public int AvailableAmount { get; set; }

        [Column("Type")]
        [MaxLength(50)]
        public string Type { get; set; }

        [Column("ArticleNumber")]
        [MaxLength(50)]
        public string ArticleNumber { get; set;}

        [Column("Name")]
        [MaxLength(30)]
        public string Name { get; set; }

        [Column("Price")]
        public double Price { get; set; }

        [Column("CreatedDate")]
        [DataType(DataType.DateTime)]
        public DateTime CreatedDate { get; set; }

        [Column("Picture")]
        public string Picture { get; set; }

        [Column("fk_manufactor_id")]
        public Manufactor Manufactor { get; set; }

        [Column("fk_shop_id")]
        public Shop Shop { get; set; }
        
        public virtual List<ProductRates> Rates { get; set; }
        public virtual List<ProductAttributes> Attributes { get; set; }
    }
}