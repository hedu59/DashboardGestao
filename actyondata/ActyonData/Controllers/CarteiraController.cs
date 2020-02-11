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
    public class CarteiraController : Controller
    {
        private readonly ICarteiraService _carteiraService;
        public CarteiraController(ICarteiraService carteiraService)
        {
            _carteiraService = carteiraService;
        }


        [HttpGet]
        [Route("v1/CarteiraAtiva/")]
        public ContentResult ObterCarteira(int contratante, string dataInicial = "", string dataFinal = "")
        {
            var carteira = _carteiraService.ObterCarteiraAtivas( dataInicial, dataFinal, contratante);

            return Content(JsonConvert.SerializeObject(carteira, _jsonSetting), "application/json");

        }

        [HttpGet]
        [Route("v1/CarteiraUnique/")]
        public ContentResult ObterCarteiraAtivasUnique(int contratante, string dataInicial = "", string dataFinal = "")
        {
            var carteira = _carteiraService.ObterCarteiraAtivasUnique(dataInicial, dataFinal, contratante);

            return Content(JsonConvert.SerializeObject(carteira, _jsonSetting), "application/json");
        }

        [HttpGet]
        [Route("v1/DetalheCarteira/")]
        public ContentResult ObterDetalheCarteira(int contratante, string dataInicial = "", string dataFinal = "")
        {
            var carteira = _carteiraService.ObterDetalheCarteira(dataInicial, dataFinal, contratante);

            return Content(JsonConvert.SerializeObject(carteira, _jsonSetting), "application/json");
        }


        [HttpGet]
        [Route("v1/EsforcoAtiva/")]
        public ContentResult ObterEsforcoAtiva(int contratante, string dataInicial = "", string dataFinal = "")
        {
            var carteira = _carteiraService.ObterEsforcoAtiva(contratante, dataInicial, dataFinal);

            return Content(JsonConvert.SerializeObject(carteira, _jsonSetting), "application/json");
        }

        [HttpGet]
        [Route("v1/EsforcoUnique/")]
        public ContentResult ObterEsforcoUnique(int contratante, string dataInicial = "", string dataFinal = "")
        {
            var carteira = _carteiraService.ObterEsforcoUnique(contratante, dataInicial, dataFinal);

            return Content(JsonConvert.SerializeObject(carteira, _jsonSetting), "application/json");
        }

        JsonSerializerSettings _jsonSetting = new JsonSerializerSettings() { NullValueHandling = NullValueHandling.Ignore };
        private static List<DashDataPoint> _dataPoints = new List<DashDataPoint>();


        [HttpGet]
        [Route("v1/FunilDeAtendimento/")]
        public ContentResult ObterFunilDeAtendimento(int contratante, string dataInicial = "", string dataFinal = "")
        {
            var carteira = _carteiraService.ObterEsforcoUnique(contratante, dataInicial, dataFinal);

            return Content(JsonConvert.SerializeObject(carteira, _jsonSetting), "application/json");
        }


    }
}