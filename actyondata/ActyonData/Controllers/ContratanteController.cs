using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ActyonData.Domain.DataContext.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ActyonData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]
    public class ContratanteController : Controller
    {
        private readonly IContratanteRepository _repository;

        public ContratanteController(IContratanteRepository repository)
        {
            _repository = repository;
        }


        [HttpGet]
        [Route("contratantes/")]
        public JsonResult ObterContratantes()
        {
            var contratantes = _repository.ObterContratantes();

            return Json(contratantes);
        }
    }
}