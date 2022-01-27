using WebProject.Models;
using Microsoft.EntityFrameworkCore;

namespace WebProject.DbContexts
{
    public class WebShopDbContext : DbContext
    {
        public DbSet<Manufactor> Manufactors { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductAttributes> ProductAttributes { get; set; }
        public DbSet<Shop> Shops { get; set; }
        public DbSet<ProductRates> ProductRates { get; set; }

        public WebShopDbContext(DbContextOptions options) 
            : base(options)
        {

        }
    }
}