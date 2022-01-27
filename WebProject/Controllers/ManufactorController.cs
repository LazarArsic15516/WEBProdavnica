using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebProject.DbContexts;
using WebProject.Models;

namespace WebProject.Controllers
{
    [ApiController]
    [Route("/manufactor")]
    public class ManufactorController : Controller
    {
        private readonly ILogger<ManufactorController> _logger;
        private readonly WebShopDbContext _context;

        public ManufactorController(ILogger<ManufactorController> logger, WebShopDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> AddManufactor([FromBody] Manufactor manufactor)
        {
            if (manufactor.Name.Length > 50 || string.IsNullOrWhiteSpace(manufactor.Name))
            {
                return BadRequest("Invalid Name");
            }

            if (manufactor.Address.Length > 50 || string.IsNullOrWhiteSpace(manufactor.Address))
            {
                return BadRequest("Invalid Address");
            }
            if (manufactor.Information.Length > 500 || string.IsNullOrWhiteSpace(manufactor.Information))
            {
                return BadRequest("Invalid Email");
            }

            try
            {
                _context.Manufactors.Add(manufactor);
                await _context.SaveChangesAsync();

                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateManufactor([FromBody] Manufactor manufactor)
        {
            if (manufactor.Id <= 0)
            {
                return BadRequest("Invalid Id");
            }
            if (manufactor.Name.Length > 50 || string.IsNullOrWhiteSpace(manufactor.Name))
            {
                return BadRequest("Invalid Name");
            }
            if (manufactor.Address.Length > 50 || string.IsNullOrWhiteSpace(manufactor.Address))
            {
                return BadRequest("Invalid Address");
            }
            if (manufactor.Information.Length > 500 || string.IsNullOrWhiteSpace(manufactor.Information))
            {
                return BadRequest("Invalid Email");
            }


            try
            {
                _context.Manufactors.Update(manufactor);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        [Route("get/all")]
        public async Task<IActionResult> GetAllManufactors()
        {
            try
            {
                var manufactors = await _context.Manufactors.ToListAsync();

                return Ok(manufactors);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetManufactor([FromQuery] int manufactorId)
        {
            if (manufactorId <= 0)
            {
                return BadRequest("Invalid Id");
            }

            try
            {
                var manufactor = await _context.Manufactors.FindAsync(manufactorId);

                return manufactor != null ? Ok(manufactor) : NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        [Route("fetch")]
        public async Task<IActionResult> GetManufactorsByShopId([FromQuery] int shopId)
        {
            if (shopId <= 0)
            {
                return BadRequest("Invalid shopId");
            }

            try
            {
                var products = await _context.Products.Include(m => m.Manufactor).Where(p => p.Shop.Id == shopId).ToListAsync();/////
                var manufactors = new List<Manufactor>();

                foreach (var prod in products)
                {
                    if (!manufactors.Any(m => m.Id == prod.Manufactor.Id))
                    {
                        manufactors.Add(prod.Manufactor);
                    }
                }

                return Ok(manufactors);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}