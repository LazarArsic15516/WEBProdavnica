using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebProject.Models 
{
    [Table("Shops")]
    public class Shop 
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Column("Name")]
        [MaxLength(50)]
        public string Name { get; set; }

        [Column("City")]
        [MaxLength(20)]
        public string City { get; set; }

        [Column("Zip")]
        [MaxLength(10)]
        [DataType(DataType.PostalCode)]
        public string Zip { get; set; }

        [Column("Email")]
        [MaxLength(50)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Column("StartTime")]
        [DataType(DataType.DateTime)]
        public DateTime StartTime { get; set; }

        [Column("EndTime")]
        [DataType(DataType.DateTime)]
        public DateTime EndTime { get; set; }

        [Column("Address")]
        [MaxLength(50)]
        public string Address { get; set; }

        [Column("PhoneNumber")]
        [MaxLength(25)]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }

        public virtual List<Product> Products { get; set; }
    }
}