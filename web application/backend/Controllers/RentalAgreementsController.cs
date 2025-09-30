using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RentalAgreementsController : ControllerBase
    {
        private readonly RentalsDbContext _context;

        public RentalAgreementsController(RentalsDbContext context)
        {
            _context = context;
        }


        // GET: api/rentalagreements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetRentalAgreements()
        {
            var agreements = await _context.RentalAgreements.ToListAsync();
            var formatted = agreements.Select(a => new {
                a.Id,
                a.Tenant,
                a.Landlord,
                StartDate = a.StartDate.ToString("dd/MM/yyyy"),
                EndDate = a.EndDate.ToString("dd/MM/yyyy"),
                a.MonthlyRent,
                a.Deposit
            });
            return Ok(formatted);
        }


        // GET: api/rentalagreements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetRentalAgreement(int id)
        {
            var agreement = await _context.RentalAgreements.FindAsync(id);
            if (agreement == null)
                return NotFound();
            var formatted = new {
                agreement.Id,
                agreement.Tenant,
                agreement.Landlord,
                StartDate = agreement.StartDate.ToString("dd/MM/yyyy"),
                EndDate = agreement.EndDate.ToString("dd/MM/yyyy"),
                agreement.MonthlyRent,
                agreement.Deposit
            };
            return Ok(formatted);
        }

        // POST: api/rentalagreements
        [HttpPost]
        public async Task<ActionResult<RentalAgreement>> CreateRentalAgreement(RentalAgreement agreement)
        {
            _context.RentalAgreements.Add(agreement);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRentalAgreement), new { id = agreement.Id }, agreement);
        }

        // PUT: api/rentalagreements/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRentalAgreement(int id, RentalAgreement agreement)
        {
            if (id != agreement.Id)
                return BadRequest();
            _context.Entry(agreement).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.RentalAgreements.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        // DELETE: api/rentalagreements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRentalAgreement(int id)
        {
            var agreement = await _context.RentalAgreements.FindAsync(id);
            if (agreement == null)
                return NotFound();
            _context.RentalAgreements.Remove(agreement);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
