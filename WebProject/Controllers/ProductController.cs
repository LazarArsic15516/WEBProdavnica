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
    [Route("/product")]
    public class ProductController : Controller
    {
        private readonly ILogger<ProductController> _logger;
        private readonly WebShopDbContext _context;

        public ProductController(ILogger<ProductController> logger, WebShopDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("index")]
        public IActionResult Index()
        {
            return View("AddProduct");    
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> AddProduct([FromBody] Product product, [FromQuery] int shopId, [FromQuery] int manufactorId)
        {       
            if(product.Name.Length>30 || string.IsNullOrWhiteSpace(product.Name))
                {
                    return BadRequest("Invalid Name");
                }
             if(product.Type.Length>50 || string.IsNullOrWhiteSpace(product.Type))
                {
                    return BadRequest("Invalid Address");
                }    
             if(product.ArticleNumber.Length>500 || string.IsNullOrWhiteSpace(product.ArticleNumber))
                {
                    return BadRequest("Invalid Email");
                }
               

             try
            {
                if(shopId>0)
                {   
                
                    var shop = await _context.Shops.FindAsync(shopId);

                    if (shop != null)
                    {
                        product.Shop = shop;
                    }
                    else
                    {
                        return BadRequest($"Ne postoji shop sa id-em {shopId}");
                    }
                }

                if(manufactorId>0)
                {

                
                
                    var manufactor = await _context.Manufactors.FindAsync(manufactorId);

                    if (manufactor != null)
                    {
                        product.Manufactor = manufactor;
                    }
                    else
                    {
                        return BadRequest($"Ne postoji manufactor sa id-em {manufactorId}");
                    }
                }

                _context.Products.Add(product);
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
        public async Task<IActionResult> UpdateProduct([FromBody] Product product, [FromQuery] int shopId, [FromQuery] int manufactorId)
        {   
            if(product.Name.Length>30 || string.IsNullOrWhiteSpace(product.Name))
                {
                    return BadRequest("Invalid Name");
                }
             if(product.Type.Length>50 || string.IsNullOrWhiteSpace(product.Type))
                {
                    return BadRequest("Invalid Address");
                }    
             if(product.ArticleNumber.Length>500 || string.IsNullOrWhiteSpace(product.ArticleNumber))
                {
                    return BadRequest("Invalid Email");
                }

           try
            {   
                if(shopId>0)
                {
                 var shop = await _context.Shops.FindAsync(shopId);

                    if (shop != null)
                    {
                        product.Shop = shop;
                    }
                    else
                    {
                        return BadRequest($"Ne postoji shop sa id-em {shopId}");
                    }
                }
               
                    if(manufactorId>0)
                    {
                
                        var manufactor = await _context.Manufactors.FindAsync(manufactorId);

                        if (manufactor != null)
                        {
                            product.Manufactor = manufactor;
                        }
                        else
                            {
                            return BadRequest($"Ne postoji manufactor sa id-em {manufactorId}");
                         }

                    }

                    if (product.Attributes.Any())
                            {
                            var attributes = await _context.ProductAttributes.Where(a => a.Product.Id == product.Id).ToListAsync();
                            _context.ProductAttributes.RemoveRange(attributes);
                            }




                   

                    _context.Products.Update(product);
                    await _context.SaveChangesAsync();
                    return Ok();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex,ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        [Route("get/types")]//
        public async Task<IActionResult> GetProductType([FromQuery] int shopId)
        {  
            if(shopId<=0)
            {
                return BadRequest("Invalid shopId");
            } 

            try
            {
                var types = await _context.Products.Where(p => p.Shop.Id == shopId).Select(p=>p.Type).Distinct().ToListAsync();

                return Ok(types);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }



        [HttpGet]
        [Route("get/by/type")]///
        public async Task<IActionResult> GetProductsByType([FromQuery] int shopId, [FromQuery] string type)
        {   
            if(shopId<=0)
            {
                return BadRequest("Invalid shopId");
            }
            if(type.Length>50 || string.IsNullOrWhiteSpace(type))
            {
                return BadRequest("Invalid type");
            }

            try
            {
                var products = await _context.Products.Include(s => s.Manufactor).Where(p => p.Shop.Id == shopId && p.Type.ToLower() == type.ToLower()).ToListAsync();

                return Ok(products);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        [Route("get/all")]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var products = await _context.Products.ToListAsync();

                return Ok(products);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetProduct([FromQuery] int productId)
        {
            try
            {
                var product = await _context.Manufactors.FindAsync(productId);

                return product != null ? Ok(product) : NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        [Route("get/all/shop")]//
        public async Task<IActionResult> GetProductsByShopId([FromQuery] int shopId)
        {   
            if(shopId<=0)
            {
                return BadRequest("Invalid ID");
            }

            try
            {
                var products = await _context.Products.Include(s => s.Manufactor).Where(p => p.Shop.Id == shopId).ToListAsync();

                await this.IncludeRatesAndAttributes(products, true, true);

                return Ok(products);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        [Route("get/all/manufactor")]
        public async Task<IActionResult> GetProductsByManufactorId([FromQuery] int manufactorId)
        {
             if(manufactorId<=0)
            {
                return BadRequest("Invalid ID");
            }


            try
            {
                var products = await _context.Products.Include(s => s.Manufactor).Where(p => p.Manufactor.Id == manufactorId).ToListAsync();
                
                await this.IncludeRatesAndAttributes(products, true, true);

                return Ok(products);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        [Route("get/all/manufactor/shop")]//
        public async Task<IActionResult> GetProductsByManufactorAndShopId([FromQuery] int manufactorId, [FromQuery] int shopId)
        {
            try
            {
                var products = await _context.Products.Include(m=>m.Manufactor).Include(s=>s.Shop).Where(p => p.Manufactor.Id == manufactorId && p.Shop.Id == shopId).ToListAsync();

                await this.IncludeRatesAndAttributes(products, true, true);///////

                return Ok(products);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteProduct([FromQuery] int productId)
        {   
            if(productId<=0)
            {
                return BadRequest("Invalid ID");
            }

            var product = await _context.Products.FindAsync(productId);
            if(product==null)
            {
                return NotFound();
            }
            try
            {
                // brisem atribute
                var attributes = await _context.ProductAttributes.Where(a => a.Product.Id == productId).ToListAsync();
                _context.ProductAttributes.RemoveRange(attributes);

                // brisem ocene
                var rates = await _context.ProductRates.Where(r => r.Product.Id == productId).ToListAsync();
                _context.ProductRates.RemoveRange(rates);

              
                
                _context.Products.Remove(product);

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

       






        private async Task IncludeRatesAndAttributes(List<Product> products, bool includeAttributes, bool includeRates)
        {
            if (includeAttributes)
            {
                foreach (var product in products)
                {
                    var attributes = await _context.ProductAttributes.Where(a => a.Product.Id == product.Id).ToListAsync();
                    product.Attributes = attributes;
                }
            }

            if (includeRates)
            {
                foreach (var product in products)
                {
                    var rates = await _context.ProductRates.Where(a => a.Product.Id == product.Id).ToListAsync();
                    product.Rates = rates;
                }
            }
        }

       
    }
}