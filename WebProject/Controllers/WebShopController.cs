using System;
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
    [Route("/shop")]
    public class WebShopController : Controller
    {
        private readonly ILogger<WebShopController> _logger;
        private readonly WebShopDbContext _context;
        
        public WebShopController(ILogger<WebShopController> logger, WebShopDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("index")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> AddShop([FromBody] Shop shop)
        {   
            if(shop.Name.Length>50 || string.IsNullOrWhiteSpace(shop.Name))
                {
                    return BadRequest("Invalid Name");
                }
             if(shop.Address.Length>50 || string.IsNullOrWhiteSpace(shop.Address))
                {
                    return BadRequest("Invalid Address");
                }    
             if(shop.Email.Length>50 || string.IsNullOrWhiteSpace(shop.Email))
                {
                    return BadRequest("Invalid Email");
                }
            

            try
            {
                _context.Shops.Add(shop);
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
        public async Task<IActionResult> UpdateShop([FromBody] Shop shop)
        {  
            if(shop.Id<=0)
            {
                return BadRequest("Inavild ID");
            }
            if(shop.Name.Length>50 || string.IsNullOrWhiteSpace(shop.Name))
                {
                    return BadRequest("Invalid Name");
                }
             if(shop.Address.Length>50 || string.IsNullOrWhiteSpace(shop.Address))
                {
                    return BadRequest("Invalid Address");
                }    
             if(shop.Email.Length>50 || string.IsNullOrWhiteSpace(shop.Email))
                {
                    return BadRequest("Invalid Email");
                }


           try
            {
                _context.Shops.Update(shop);
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
        public async Task<IActionResult> GetAllShops()
        {
            try
            {
                var shops = await _context.Shops.ToListAsync();

                return Ok(shops);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetShop([FromQuery] int shopId)
        {   
            if(shopId<=0)
            {
                return BadRequest("Invalid ID");
            }

           try
            {
                var shop = await _context.Shops.FindAsync(shopId);

                return shop != null ? Ok(shop) : NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
