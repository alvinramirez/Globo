using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using MiniValidation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddDbContext<HouseDbContext>(o => 
    o.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));
builder.Services.AddScoped<IHouseRepository, HouseRepository>();
builder.Services.AddScoped<IBidRepository, BidRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(p => p.WithOrigins("http://localhost:3000")
    .AllowAnyHeader().AllowAnyMethod());

app.UseHttpsRedirection();

app.MapHouseEndpoints();

app.MapGet("house/{houseId:int}/bids", async (int houseId, 
    IHouseRepository houseRepo, IBidRepository bidRepo) => 
{
    if (await houseRepo.Get(houseId) == null)
        return Results.Problem($"House {houseId} not found",
            statusCode: 404);
        var bids = await bidRepo.Get(houseId);
        return Results.Ok(bids);
}).ProducesProblem(404).Produces(StatusCodes.Status200OK);

app.MapPost("house/{houseId:int}/bids", async (int houseId, 
    [FromBody]BidDto dto, IBidRepository repo) => 
{
    if (dto.HouseId != houseId)
        return Results.Problem("No match", 
            statusCode: StatusCodes.Status400BadRequest);
    if (!MiniValidator.TryValidate(dto, out var errors))
        return Results.ValidationProblem(errors);
    var newBid = await repo.Add(dto);
    return Results.Created($"/houses/{newBid.HouseId}/bids", newBid);
}).ProducesValidationProblem().ProducesProblem(400)
    .Produces<BidDto>(StatusCodes.Status201Created);

app.Run();
