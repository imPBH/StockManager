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

            var articles = _context.Articles
                .Where(a => a.Id_Warehouse == idWarehouse)
                .Join(
                    _context.Companies_References,
                    article => new { article.Id_Reference, warehouse.Id_Company },
                    companyReference => new { companyReference.Id_Reference, companyReference.Id_Company },
                    (article, companyReference) => new
                    {
                        article.Id,
                        article.Id_Reference,
                        article.Id_Warehouse,
                        article.Expiration,
                        companyReference.Reference.Name,
                        companyReference.Reference.Price
                    })
                .ToList();

            return Ok(articles);
        }

        public class UpdateModel
        {
            public int Id { get; set; }
            public DateTime? Expiration { get; set; }
        }

        [Authorize]
        [HttpPost("update")]
        public IActionResult Update([FromBody] UpdateModel model)
        {
            var article = _context.Articles.FirstOrDefault(a => a.Id == model.Id);

            if (article == null)
            {
                return BadRequest("Article not found");
            }

            var user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);

            if (user == null)
            {
                return StatusCode(401);
            }

            var warehouse = _context.Warehouses.FirstOrDefault(w => w.Id == article.Id_Warehouse);

            if (warehouse == null)
            {
                return BadRequest("Warehouse not found");
            }

            var userCompany = _context.Users_Companies.FirstOrDefault(uc => uc.Id_User == user.Id && uc.Id_Company == warehouse.Id_Company);

            if (userCompany == null)
            {
                return Forbid();
            }

            if (model.Expiration.HasValue)
            {
                article.Expiration = model.Expiration.Value;
            }
            else
            {
                article.Expiration = null;
            }

            _context.SaveChanges();

            return Ok(article);
        }

        public class DeleteModel
        {
            public int Id_Article { get; set; }
        }

        [Authorize]
        [HttpPost("delete")]
        public IActionResult Delete([FromBody] DeleteModel model)
        {
            var article = _context.Articles.FirstOrDefault(a => a.Id == model.Id_Article);
            if (article == null)
            {
                return BadRequest("Article not found");
            }

            var user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);
            if (user == null)
            {
                return StatusCode(401);
            }

            var warehouse = _context.Warehouses.FirstOrDefault(w => w.Id == article.Id_Warehouse);
            if (warehouse == null)
            {
                return BadRequest("Warehouse not found");
            }

            var userCompany = _context.Users_Companies.FirstOrDefault(uc => uc.Id_User == user.Id && uc.Id_Company == warehouse.Id_Company);
            if (userCompany == null)
            {
                return Forbid();
            }

            _context.Articles.Remove(article);
            _context.SaveChanges();
            return Ok(new { message = "Article deleted successfully" });
        }
    }
}
