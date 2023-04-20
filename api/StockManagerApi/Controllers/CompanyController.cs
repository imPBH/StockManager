using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagerApi.Data;
using StockManagerApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace StockManagerApi.Controllers
{
    [Route("api/companies")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly DataContext _context;

        public CompanyController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost("create")]
        public IActionResult Create(string name)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);
            if (user == null)
            {
                return BadRequest();
            }

            var company = new Company
            {
                Name = name
            };
            _context.Companies.Add(company);

            _context.SaveChanges();

            var userCompany = new UserCompany
            {
                Id_User = user.Id,
                Id_Company = company.Id
            };
            _context.Users_Companies.Add(userCompany);

            _context.SaveChanges();

            return Created($"api/company/{company.Id}", company.Id);
        }

        [Authorize]
        [HttpPost("delete")]
        public IActionResult Delete(int companyId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);
            if (user == null)
            {
                return BadRequest();
            }

            var company = _context.Companies.FirstOrDefault(c => c.Id == companyId);
            if (company == null)
            {
                return NotFound();
            }

            var userCompany = _context.Users_Companies.FirstOrDefault(uc => uc.Id_User == user.Id && uc.Id_Company == company.Id);
            if (userCompany == null)
            {
                return Forbid();
            }

            var userCompanies = _context.Users_Companies.Where(uc => uc.Id_Company == companyId);
            _context.Users_Companies.RemoveRange(userCompanies);

            _context.Companies.Remove(company);

            _context.SaveChanges();

            return Ok(new { message = "Successfully deleted" });
        }

        [Authorize]
        [HttpPost("update")]
        public IActionResult Update(int companyId, string newName)
        {
            var currentUser = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);

            var userCompany = _context.Users_Companies.Include(uc => uc.Company).FirstOrDefault(uc => uc.Id_Company == companyId && uc.Id_User == currentUser.Id);

            if (userCompany == null)
            {
                return BadRequest("The specified company does not belong to the current user");
            }

            userCompany.Company.Name = newName;
            _context.SaveChanges();

            return Ok("Company name successfully updated");
        }

        [Authorize]
        [HttpGet("get")]
        public ActionResult<IEnumerable<Company>> Get()
        {
            var currentUser = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);

            var companies = _context.Users_Companies
                .Include(uc => uc.Company)
                .Where(uc => uc.Id_User == currentUser.Id)
                .Select(uc => uc.Company)
                .ToList();

            return Ok(companies);
        }
    }
}
