using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockManagerApi.Data;
using StockManagerApi.Models;
using System;
using System.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace StockManagerApi.Controllers
{
    [Route("api/article")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly DataContext _context;
        public ArticleController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost("create")]
        public IActionResult Create(int idReference, DateTime? expiration, int idWarehouse)
        {

            var user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);
            if (user == null)
            {
                return StatusCode(401);
            }

            var warehouse = _context.Warehouses.FirstOrDefault(warehouse => warehouse.Id == idWarehouse);
            if (warehouse == null)
            {
                return BadRequest("Warehouse not found");
            }

            var userCompany = _context.Users_Companies.FirstOrDefault(uc => uc.Id_User == user.Id && uc.Id_Company == warehouse.Id_Company);
            if (userCompany == null)
            {
                return Forbid();
            }

            var companyReference = _context.Companies_References.FirstOrDefault(cr => cr.Id_Company == warehouse.Id_Company && cr.Id_Reference == idReference);
            if (companyReference == null)
            {
                return Forbid();
            }

            var newArticle = new Article
            {
                Id_Reference = idReference,
                Id_Warehouse = idWarehouse,
                Expiration = expiration
            };

            _context.Articles.Add(newArticle);
            _context.SaveChanges();
            return Created($"api/article/{newArticle.Id}", newArticle.Id);
        }
    }
}
