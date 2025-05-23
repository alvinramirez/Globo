using Microsoft.EntityFrameworkCore;

public class HouseDbContext: DbContext
{
    public HouseDbContext(DbContextOptions<HouseDbContext> options):
        base(options) {}
    public DbSet<HouseEntity> Houses => Set<HouseEntity>();
    public DbSet<BidEntity> Bids => Set<BidEntity>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        optionsBuilder
            .UseSqlite($"Data Source={Path.Join(path, "house.db")}");
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        SeedData.Seed(builder);
    }
}