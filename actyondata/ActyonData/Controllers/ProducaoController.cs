using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ActyonData.Application.Interfaces;
using ActyonData.Domain.DataContext.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ActyonData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]
    public class ProducaoController : Controller
    {


        private readonly IProducaoService _producaoService;

        public ProducaoController(IProducaoService producaoService)
        {
            _producaoService = producaoService;
        }


        [HttpGet]
        [Route("v1/Producao/")]
        public ContentResult ObterPagamentos(string dataInicial = "", string datafinal = "")
        {
            var ranking = _producaoService.ObterPagamentosContratantes(dataInicial, datafinal );

            return Content(JsonConvert.SerializeObject(ranking, _jsonSetting), "application/json");
        }

        [HttpGet]
        [Route("v1/TotalRecebido/")]
        public ContentResult ObterSomaPagamentos(string dataInicial = "", string datafinal = "")
        {
            var ranking = _producaoService.ObterSomaPagamentos(dataInicial, datafinal);

            return Content(JsonConvert.SerializeObject(ranking, _jsonSetting), "application/json");
        }

        [HttpGet]
        [Route("v1/Acordos")]
        public ContentResult ObterAcordosPorContratantes(string dataInicial = "", string datafinal = "")
        {
            var ranking = _producaoService.ObterAcordosPorContratantes(dataInicial, datafinal);

            return Content(JsonConvert.SerializeObject(ranking, _jsonSetting), "application/json");
        }



        JsonSerializerSettings _jsonSetting = new JsonSerializerSettings() { NullValueHandling = NullValueHandling.Ignore };

        private static List<DashDataPoint> _dataPoints = new List<DashDataPoint>();
    }
}