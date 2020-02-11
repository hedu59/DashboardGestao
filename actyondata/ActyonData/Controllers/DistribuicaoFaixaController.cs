using ActyonData.Application.Interfaces;
using ActyonData.Domain.DataContext.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace ActyonData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]
    public class DistribuicaoFaixaController : Controller
    {
        private readonly IDistribuicaoFaixaService _faixaService;
        public DistribuicaoFaixaController(IDistribuicaoFaixaService faixaService)
        {
            _faixaService = faixaService;
        }
          

        [HttpGet]
        [Route("faixa/CPF/")]

        public ContentResult ObterFaixaCpf(int contratante, string dataInicial = "", string dataFinal = "")
        {
            var uf = _faixaService.ObterDistribuicaoFaixaCPF(contratante, dataInicial, dataFinal);

            return Content(JsonConvert.SerializeObject(uf, _jsonSetting), "application/json");
        
        }


        [HttpGet]
        [Route("faixa/Valor/")]

        public ContentResult ObterFaixaValor(int contratante, string dataInicial = "", string dataFinal = "")
        {
            var uf = _faixaService.ObterDistribuicaoFaixaValor(contratante, dataInicial, dataFinal);

            return Content(JsonConvert.SerializeObject(uf, _jsonSetting), "application/json");
            
        }

        [HttpGet]
        [Route("faixa/Ticket/")]

        public ContentResult ObterFaixaTicket(int contratante, string dataInicial = "", string dataFinal = "")
        {
            var uf = _faixaService.ObterDistribuicaoFaixaTicket(contratante, dataInicial, dataFinal);

            return Content(JsonConvert.SerializeObject(uf, _jsonSetting), "application/json");

        }

        [HttpGet]
        [Route("faixa/CPC/")]

        public ContentResult ObterFaixaCPC(int contratante, string dataInicial = "", string dataFinal = "")
        {
            var uf = _faixaService.ObterDistribuicaoFaixaCPC(contratante, dataInicial, dataFinal);

            return Content(JsonConvert.SerializeObject(uf, _jsonSetting), "application/json");

        }

        [HttpGet]
        [Route("faixa/CPCA/")]

        public ContentResult ObterFaixaCPCA(int contratante, string dataInicial = "", string dataFinal = "")
        {
            var uf = _faixaService.ObterDistribuicaoFaixaCPCA(contratante, dataInicial, dataFinal);

            return Content(JsonConvert.SerializeObject(uf, _jsonSetting), "application/json");

        }

        [HttpGet]
        [Route("faixa/Conversao/")]

        public ContentResult ObterFaixaConversao(int contratante, string dataInicial = "", string datafinal = "")
        {
            var uf = _faixaService.ObterDistribuicaoFaixaConversao(contratante, dataInicial, datafinal);

            return Content(JsonConvert.SerializeObject(uf, _jsonSetting), "application/json");

        }
       

        [HttpGet]
        [Route("faixa/Detalhe/")]

        public ContentResult ObterFaixaConversao(int contratante, string dataInicial = "", string datafinal = "", string faixaNome="")
        {
            var uf = _faixaService.ObterDetalheFaixa(contratante, dataInicial, datafinal, faixaNome);

            return Content(JsonConvert.SerializeObject(uf, _jsonSetting), "application/json");

        }

        JsonSerializerSettings _jsonSetting = new JsonSerializerSettings() { NullValueHandling = NullValueHandling.Ignore };

        private static List<DashDataPoint> _dataPoints = new List<DashDataPoint>();
    }
}