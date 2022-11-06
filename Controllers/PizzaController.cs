using ContosoPizza.Models;
using ContosoPizza.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContosoPizza.Controllers;

[ApiController]
[Route(template: "[controller]")]
public class PizzaController : ControllerBase
{
    public PizzaController() { }

    // GET all action
    [HttpGet]
    public ActionResult<List<Pizza>> GetAll() => PizzaService.GetAll();

    // GET by Id action

    [HttpGet(template: "{id}")]
    // POST action
    public ActionResult<Pizza> Get(int id)
    {
        var pizza = PizzaService.Get(id);
        if (pizza is null)
            return NotFound();
        return pizza;
    }

    // POST action

    [HttpPost]
    public IActionResult Create(Pizza pizza)
    {
        PizzaService.Add(pizza);
        return CreatedAtAction(nameof(Create), new { id = pizza.Id }, pizza);
    }

    // PUT action
    [HttpPut(template: "{id}")]
    public IActionResult Update(int id, Pizza pizza)
    {
        // This code will update the pizza and return a result
        if (id != pizza.Id)
            return BadRequest();

        // get the pizza instance with given id
        var existingPizza = PizzaService.Get(id);
        if (existingPizza is null)
            return NotFound();

        PizzaService.Update(pizza);

        return NoContent();
    }

    // DELETE action
    [HttpDelete(template: "{id}")]
    public IActionResult Delete(int id)
    {
        // This code will delete the pizza and return a result
        var pizzaToDelete = PizzaService.Get(id);
        if (pizzaToDelete is null)
            return NotFound();

        PizzaService.Delete(id);

        return NoContent();
    }
}
