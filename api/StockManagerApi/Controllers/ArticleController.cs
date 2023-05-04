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
        public IActionResult Create(Article article)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);
            if (user == null)
            {
                return StatusCode(401);
            }

            var warehouse = _context.Warehouses.FirstOrDefault(warehouse => warehouse.Id == article.Id_Warehouse);
            if (warehouse == null)
            {
                return BadRequest("Warehouse not found");
            }

            var userCompany = _context.Users_Companies.FirstOrDefault(uc => uc.Id_User == user.Id && uc.Id_Company == warehouse.Id_Company);
            if (userCompany == null)
            {
                return Forbid();
            }

            var companyReference = _context.Companies_References.FirstOrDefault(cr => cr.Id_Company == warehouse.Id_Company && cr.Id_Reference == article.Id_Reference);
            if (companyReference == null)
            {
                return Forbid();
            }

            _context.Articles.Add(article);
            _context.SaveChanges();
            return Created($"api/article/{article.Id}", article.Id);
        }

        [Authorize]
        [HttpGet("get")]
        public IActionResult Get(int idWarehouse)
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

            var articles = _context.Articles.Where(a => a.Id_Warehouse == idWarehouse).ToList();
            return Ok(articles);
        }
    }
}
