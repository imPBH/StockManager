using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockManagerApi.Data;
using StockManagerApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockManagerApi.Controllers
{
    [Route("api/sale")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly DataContext _context;
        public SaleController(DataContext context)
        {
            _context = context;
        }

        public class SaleModel
        {
            public int Id_Company { get; set; }
            public List<Article> Articles { get; set; }
        }

        [Authorize]
        [HttpPost("create")]
        [HttpPost("/sale/create")]
        public async Task<IActionResult> CreateSale([FromBody] SaleModel saleModel)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name);
            if (user == null)
            {
                return StatusCode(401);
            }

            // Vérifier si l'entreprise existe
            var company = await _context.Companies.FindAsync(saleModel.Id_Company);
            if (company == null)
            {
                return NotFound("L'entreprise spécifiée n'existe pas.");
            }

            var userCompany = _context.Users_Companies.FirstOrDefault(uc => uc.Id_User == user.Id && uc.Id_Company == company.Id);
            if (userCompany == null)
            {
                return Forbid();
            }

            // Créer une vente
            var sale = new Sale
            {
                Id_Company = saleModel.Id_Company,
                Created_at = DateTime.Now
            };
            _context.Sales.Add(sale);
            _context.SaveChanges();

            // Ajouter les articles à la vente
            foreach (var article in saleModel.Articles)
            {
                // Vérifier si la référence de l'article existe
                var reference = await _context.Items_References.FindAsync(article.Id_Reference);
                if (reference == null)
                {
                    return NotFound("La référence d'article spécifiée n'existe pas.");
                }

                var companyReference = _context.Companies_References.FirstOrDefault(cr => cr.Id_Company == saleModel.Id_Company && cr.Id_Reference == article.Id_Reference);
                if (companyReference == null)
                {
                    return Forbid();
                }

                // Vérifier si l'entrepôt existe (s'il est spécifié)
                if (article.Id_Warehouse.HasValue)
                {
                    var warehouse = await _context.Warehouses.FindAsync(article.Id_Warehouse.Value);
                    if (warehouse == null)
                    {
                        return NotFound("L'entrepôt spécifié n'existe pas.");
                    }
                }

                var articleToUpdate = _context.Articles.FirstOrDefault(atp => atp.Id == article.Id);
                if (articleToUpdate != null && articleToUpdate.Id_Warehouse.HasValue)
                {
                    articleToUpdate.Id_Warehouse = null;
                    _context.SaveChanges();
                }

                // Ajouter l'article à la vente
                var saleItem = new SaleItem
                {
                    Id_Sale = sale.Id,
                    Id_Article = article.Id,
                };
                _context.Sales_Items.Add(saleItem);
                _context.SaveChanges();
            }

            return Ok(sale);
        }
    }
}
