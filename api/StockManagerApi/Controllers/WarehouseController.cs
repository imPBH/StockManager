using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagerApi.Data;
using StockManagerApi.Models;
using System.ComponentModel.Design;
using System.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace StockManagerApi.Controllers
{
    [Route("api/warehouses")]
    [ApiController]
    public class WarehouseController : ControllerBase
    {
        private readonly DataContext _context;

        public WarehouseController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost("create")]
        public IActionResult Create(string name, int companyId)
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

            var warehouse = new Warehouse
            {
                Name = name,
                Id_Company = companyId
            };

            _context.Warehouses.Add(warehouse);

            _context.SaveChanges();

            return Created(name, companyId);

        }


        [Authorize]
        [HttpPost("update")]
        public IActionResult Update(int id, string newName)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);
            if (user == null)
            {
                return StatusCode(401);
            }

            var warehouse = _context.Warehouses.FirstOrDefault(w => w.Id == id);
            if (warehouse == null)
            {
                return BadRequest(new { message = "Warehouse not found" });
            }

            var company = _context.Companies.FirstOrDefault(c => c.Id == warehouse.Id_Company);
            if (company == null)
            {
                return BadRequest(new { message = "Company not found" });
            }

            var userCompany = _context.Users_Companies.FirstOrDefault(uc => uc.Id_User == user.Id && uc.Id_Company == company.Id);
            if (userCompany == null)
            {
                return Forbid();
            }

            warehouse.Name = newName;
            _context.SaveChanges();

            return Ok(new { message = "Warehouse updated successfully" });
        }
    }
}
