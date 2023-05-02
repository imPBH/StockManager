using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagerApi.Data;
using StockManagerApi.Models;
using System.Linq;

namespace StockManagerApi.Controllers
{
    [Route("api/reference")]
    [ApiController]
    public class ReferenceController : ControllerBase
    {
        private readonly DataContext _context;
        public ReferenceController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost("create")]
        public IActionResult Create(int barcode, string name, float price, int companyId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);
            if (user == null)
            {
                return StatusCode(401);
            }

            var company = _context.Companies.FirstOrDefault(c => c.Id == companyId);
            if (company == null)
            {
                return BadRequest(new { message = "Company not found" });
            }

            var userCompany = _context.Users_Companies.FirstOrDefault(uc => uc.Id_User == user.Id && uc.Id_Company == company.Id);
            if (userCompany == null)
            {
                return Forbid();
            }

            var newReference = new ItemReference
            {
                Barcode_value = barcode,
                Name = name,
                Price = price
            };

            _context.Items_References.Add(newReference);
            _context.SaveChanges();

            var newCompanyReference = new CompanyReference
            {
                Id_Company = companyId,
                Id_Reference = newReference.Id
            };

            _context.Companies_References.Add(newCompanyReference);
            _context.SaveChanges();

            return Ok(newReference);
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get(int companyId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);
            if (user == null)
            {
                return StatusCode(401);
            }

            var company = _context.Companies.FirstOrDefault(c => c.Id == companyId);
            if (company == null)
            {
                return BadRequest(new { message = "Company not found" });
            }

            var userCompany = _context.Users_Companies.FirstOrDefault(uc => uc.Id_User == user.Id && uc.Id_Company == company.Id);
            if (userCompany == null)
            {
                return Forbid();
            }

            var references = _context.Companies_References
                .Include(cr => cr.Reference)
                .Where(cr => cr.Id_Company == companyId)
                .Select(uc => uc.Reference)
                .ToList();

            return Ok(references);
        }
    }
}
