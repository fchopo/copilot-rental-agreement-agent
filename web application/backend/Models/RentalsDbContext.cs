using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class RentalAgreement
    {
        public int Id { get; set; }
        public string Tenant { get; set; } = string.Empty;
        public string Landlord { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal MonthlyRent { get; set; }
        public decimal Deposit { get; set; }
    }

    public class RentalsDbContext : DbContext
    {
        public RentalsDbContext(DbContextOptions<RentalsDbContext> options) : base(options) { }
        public DbSet<RentalAgreement> RentalAgreements { get; set; }
    }
}
