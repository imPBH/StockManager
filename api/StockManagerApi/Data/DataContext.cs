using Microsoft.EntityFrameworkCore;
using StockManagerApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockManagerApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<UserCompany> Users_Companies { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<ItemReference> Items_References { get; set; }
        public DbSet<CompanyReference> Companies_References { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<SaleItem> Sales_Items { get; set; }
    }
}
