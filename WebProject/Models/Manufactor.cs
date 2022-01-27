using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebProject.Models
{
    [Table("Manufactors")]
    public class Manufactor
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }

        [Column("Name")]
        [MaxLength(50)]
        public string Name { get; set; }

        [Column("City")]
        [MaxLength(50)]
        public string City { get; set; }

        [Column("Adress")]
        [MaxLength(50)]
        public string Address { get; set;}

        [Column("Zip")]
        [MaxLength(50)]
        public string Zip { get; set; }

        [Column("Email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Column("CreatedDate")]
        [DataType(DataType.DateTime)]
        public DateTime CreatedDate { get; set; }

        [Column("Information")]
        [MaxLength(500)]
        public string Information { get; set; }

        [Column("PhoneNumber")]
        [MaxLength(30)]
        public string PhoneNumber { get; set; }

        public virtual List<Product> Products { get; set; }
    }
}