using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
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
        public IActionResult Create([FromBody] Warehouse warehouse)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);
            if (user == null)
            {
                return StatusCode(401);
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

            _context.Warehouses.Add(warehouse);

            _context.SaveChanges();

            return Created($"api/warehouses/{warehouse.Id}", warehouse.Id);

        }

        public class UpdateModel
        {
            public int IdWarehouse { get; set; }
            public string Name { get; set; }
        }

        [Authorize]
        [HttpPost("update")]
        public IActionResult Update([FromBody] UpdateModel model)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);
            if (user == null)
            {
                return StatusCode(401);
            }

            var warehouse = _context.Warehouses.FirstOrDefault(w => w.Id == model.IdWarehouse);
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

            warehouse.Name = model.Name;
            _context.SaveChanges();

            return Ok(warehouse);
        }

        public class DeleteModel
        {
            public int IdWarehouse { get; set; }
        }

        [Authorize]
        [HttpPost("delete")]
        public IActionResult Delete([FromBody] DeleteModel model)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);
            if (user == null)
            {
                return StatusCode(401);
            }

            var warehouse = _context.Warehouses.FirstOrDefault(w => w.Id == model.IdWarehouse);
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

            try
            {
                _context.Warehouses.Remove(warehouse);
                _context.SaveChanges();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqliteException sqliteException && sqliteException.SqliteErrorCode == 19)
                {
                    return BadRequest(new { message = "Cannot delete warehouse, there are still articles linked to it." });
                }
                throw;
            }

            return Ok(new { message = "Warehouse deleted successfully" });
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

            var warehouses = _context.Warehouses.Where(w => w.Id_Company == companyId).ToList();
            return Ok(warehouses);
        }
    }
}
