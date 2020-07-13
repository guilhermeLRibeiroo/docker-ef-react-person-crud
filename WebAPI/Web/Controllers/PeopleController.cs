using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Web.Context;
using Web.Entities;

namespace Web.Controllers
{
    [Route("api/People")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly EntityFrameworkContext _dbContext;
        public PeopleController(EntityFrameworkContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<JsonResult> GetAll()
        {
            return await GetAllWithFilters("");
        }

        [HttpGet]
        [Route("{search}")]
        public async Task<JsonResult> GetAllWithFilters([FromRoute]string search = "")
        {
            return new JsonResult(new { people = await _dbContext.People.Where(d => d.Active && (d.FirstName + ' ' + d.LastName).Contains(search)).ToListAsync() });
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody]Person request)
        {
            request.Active = true;
            await _dbContext.People.AddAsync(request);
            await _dbContext.SaveChangesAsync();
            return new OkResult();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Delete([FromRoute] Guid id)
        {
            var person = _dbContext.People.FirstOrDefault(d => d.Id == id);
            if (person != null)
            {   
                person.Active = false;
                _dbContext.People.Update(person);
                await _dbContext.SaveChangesAsync();
            }
            return new OkResult();
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> Update([FromRoute] Guid id, [FromBody] Person request)
        {
            var person = _dbContext.People.FirstOrDefault(d => d.Id == id);
            if(person != null)
            {
                person.FirstName = request.FirstName;
                person.LastName = request.LastName;
                _dbContext.People.Update(person);
                await _dbContext.SaveChangesAsync();
            }
            return new OkResult();
        }
    }
}