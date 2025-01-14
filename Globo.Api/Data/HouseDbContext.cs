using Microsoft.EntityFrameworkCore;

public class HouseDbContext: DbContext
{
    public DbSet<HouseEntity> Houses => Set<HouseEntity>();
}