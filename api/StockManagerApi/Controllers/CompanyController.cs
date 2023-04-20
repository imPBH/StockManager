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
    [Route("api/[controller]")]
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
    }
}
