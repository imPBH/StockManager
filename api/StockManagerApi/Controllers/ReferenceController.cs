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

        public class CreateReferenceModel
        {
            public ItemReference Reference { get; set; }
            public int CompanyId { get; set; }
        }

        [Authorize]
        [HttpPost("create")]
        public IActionResult Create([FromBody] CreateReferenceModel model)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);
            if (user == null)
            {
                return StatusCode(401);
            }

            var company = _context.Companies.FirstOrDefault(c => c.Id == model.CompanyId);
            if (company == null)
            {
                return BadRequest(new { message = "Company not found" });
            }

            var userCompany = _context.Users_Companies.FirstOrDefault(uc => uc.Id_User == user.Id && uc.Id_Company == company.Id);
            if (userCompany == null)
            {
                return Forbid();
            }

            _context.Items_References.Add(model.Reference);
            _context.SaveChanges();

            var newCompanyReference = new CompanyReference
            {
                Id_Company = model.CompanyId,
                Id_Reference = model.Reference.Id
            };

            _context.Companies_References.Add(newCompanyReference);
            _context.SaveChanges();

            return Ok(model.Reference);
        }

        [Authorize]
        [HttpGet("get")]
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

        public class LoginModel
        {
            public int CompanyId { get; set; }
            public int ReferenceId { get; set; }
        }

        [Authorize]
        [HttpPost("delete")]
        public IActionResult Delete([FromBody] LoginModel model)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);
            if (user == null)
            {
                return StatusCode(401);
            }

            var company = _context.Companies.FirstOrDefault(c => c.Id == model.CompanyId);
            if (company == null)
            {
                return BadRequest(new { message = "Company not found" });
            }

            var userCompany = _context.Users_Companies.FirstOrDefault(uc => uc.Id_User == user.Id && uc.Id_Company == company.Id);
            if (userCompany == null)
            {
                return Forbid();
            }

            var companyReference = _context.Companies_References.FirstOrDefault(cr => cr.Id_Company == model.CompanyId && cr.Id_Reference == model.ReferenceId);
            if (companyReference == null)
            {
                return BadRequest(new { message = "Reference not found" });
            }

            _context.Companies_References.Remove(companyReference);
            _context.SaveChanges();

            return Ok();
        }

    }
}
