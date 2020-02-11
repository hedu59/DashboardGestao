using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ActyonData.Application.Interfaces;
using ActyonData.Domain.DataContext.Models;
using ActyonData.Domain.DataContext.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ActyonData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]

    public class DistribuicaoUFController : Controller
    {
        private readonly IDistribuicaoUFService _ufService;

        public DistribuicaoUFController(IDistribuicaoUFService ufService)
        {
            _ufService = ufService;
        }


        [HttpGet]
        [Route("uf/CPF/")]
        public ContentResult ObterCPF(int contratante, string dataInicial="", string datafinal="")
        {
            var uf = _ufService.ObterDistribuicaoUFxCPF(contratante,dataInicial, datafinal);

            return Content(JsonConvert.SerializeObject(uf, _jsonSetting), "application/json");
        }

        [HttpGet]
        [Route("uf/Valor/")]
        public ContentResult ObterValor(int contratante, string dataInicial = "", string datafinal = "")
        {
            var uf = _ufService.ObterDistribuicaoUFxValor(contratante, dataInicial, datafinal);

            return Content(JsonConvert.SerializeObject(uf, _jsonSetting), "application/json");
        }

        [HttpGet]
        [Route("uf/Ticket/")]
        public ContentResult ObterTiket(int contratante, string dataInicial = "", string datafinal = "")
        {
            var uf = _ufService.ObterDistribuicaoUFxTicket(contratante, dataInicial, datafinal);

            return Content(JsonConvert.SerializeObject(uf, _jsonSetting), "application/json");
        }

        [HttpGet]
        [Route("uf/ValorRegiao/")]
        public ContentResult ObterValorRegiao(int contratante, string dataInicial = "", string datafinal = "")
        {
            var uf = _ufService.ObterValorRegiao(contratante, dataInicial, datafinal);

            return Content(JsonConvert.SerializeObject(uf, _jsonSetting), "application/json");
        }

        [HttpGet]
        [Route("uf/TicketRegiao/")]
        public ContentResult ObterTicketRegiao(int contratante, string dataInicial = "", string datafinal = "")
        {
            var uf = _ufService.ObterTicketRegiao(contratante, dataInicial, datafinal);

            return Content(JsonConvert.SerializeObject(uf, _jsonSetting), "application/json");
        }

        [HttpGet]
        [Route("uf/Conversao/")]
        public ContentResult ObterConversao(int contratante, string dataInicial = "", string datafinal = "")
        {
            var uf = _ufService.ObterConversao(contratante, dataInicial, datafinal);

            return Content(JsonConvert.SerializeObject(uf, _jsonSetting), "application/json");
        }


        JsonSerializerSettings _jsonSetting = new JsonSerializerSettings() { NullValueHandling = NullValueHandling.Ignore };

        private static List<DashDataPoint> _dataPoints = new List<DashDataPoint>();
    }
}