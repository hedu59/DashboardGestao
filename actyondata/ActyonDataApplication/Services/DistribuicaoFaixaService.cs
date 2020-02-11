using ActyonData.Application.Interfaces;
using ActyonData.Application.Utils;
using ActyonData.Domain.DataContext.Entities;
using ActyonData.Domain.DataContext.Models;
using ActyonData.Domain.DataContext.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ActyonData.Application.Services
{
    public class DistribuicaoFaixaService : IDistribuicaoFaixaService
    {
        private readonly IDistribuicaoFaixaRepository _faixaRepository;
        private readonly IContratanteRepository _contratanteRepositoty;

        public DistribuicaoFaixaService(IDistribuicaoFaixaRepository faixaRepository, IContratanteRepository contratanteRepositoty)
        {
            _faixaRepository = faixaRepository;
            _contratanteRepositoty = contratanteRepositoty;
        }

        public List<DashDataPoint> ObterDistribuicaoFaixaCPF(int contratante, string dataInicial = "", string datafinal = "")
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataInicial, datafinal);

            var dadosUFCPF = _faixaRepository.ObterDistribuicaoFaixaCPF(contratante, data.dataIni, data.dataFim);
            var _dataPoints = new List<DashDataPoint>();




            if (dadosUFCPF.Count() > 0)
            {
                foreach (var item in dadosUFCPF.GroupBy(x=> x.FASE))
                {
                    _dataPoints.Add(new DashDataPoint(Convert.ToDouble(item.Count()), item.Key));
                }
            }


            return _dataPoints;


        }
        public List<DashDataPoint> ObterDistribuicaoFaixaValor(int contratante, string dataInicial = "", string datafinal = "")
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataInicial, datafinal);

            var dadosUFCPF = _faixaRepository.ObterDistribuicaoFaixaValor(contratante, data.dataIni, data.dataFim);
            var _dataPoints = new List<DashDataPoint>();


            if (dadosUFCPF.Count() > 0)
            {
                foreach (var item in dadosUFCPF.GroupBy(x => x.FASE))
                {
                    _dataPoints.Add(new DashDataPoint(Convert.ToDouble(item.Sum(x => x.VALOR)), item.Key));
                }
            }


            return _dataPoints;
        }
        public List<DashDataPoint> ObterDistribuicaoFaixaTicket(int contratante, string dataInicial = "", string datafinal = "")
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataInicial, datafinal);

            var dadosUFCPF = _faixaRepository.ObterDistribuicaoFaixaTicket(contratante, data.dataIni, data.dataFim);
            var _dataPoints = new List<DashDataPoint>();


            if (dadosUFCPF.Count() > 0)
            {
                foreach (var item in dadosUFCPF.GroupBy(x => x.FASE))
                {
                    var quantidade = item.Count();
                    var valor = item.Sum(x => x.VALOR_TICKET);
                    var ticket = Math.Round(valor / quantidade,2);
                    _dataPoints.Add(new DashDataPoint(Convert.ToDouble(ticket), item.Key));
                }
            }


            return _dataPoints;
        }
        public List<DashDataPoint> ObterDistribuicaoFaixaCPC(int contratante, string dataInicial = "", string datafinal = "")
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataInicial, datafinal);

            var dadosUFCPF = _faixaRepository.ObterDistribuicaoFaixaCPC(contratante, data.dataIni, data.dataFim);
            var _dataPoints = new List<DashDataPoint>();


            if (dadosUFCPF.Count() > 0)
            {
                foreach (var item in dadosUFCPF.GroupBy(x => x.FASE))
                {
                    _dataPoints.Add(new DashDataPoint(Convert.ToDouble(item.Sum(x => x.CPC)), item.Key));
                }
            }


            return _dataPoints;
        }
        public List<DashDataPoint> ObterDistribuicaoFaixaCPCA(int contratante, string dataInicial = "", string datafinal = "")
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataInicial, datafinal);

            var dadosUFCPF = _faixaRepository.ObterDistribuicaoFaixaCPCA(contratante, data.dataIni, data.dataFim);
            var _dataPoints = new List<DashDataPoint>();


            if (dadosUFCPF.Count() > 0)
            {
                foreach (var item in dadosUFCPF.GroupBy(x => x.FASE))
                {
                    _dataPoints.Add(new DashDataPoint(Convert.ToDouble(item.Sum(x => x.CPCA)), item.Key));
                }
            }


            return _dataPoints;
        }

        public List<DashDataPoint> ObterDistribuicaoFaixaConversao(int contratante, string dataInicial = "", string datafinal = "")
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataInicial, datafinal);

            var dadosConversao = _faixaRepository.ObterDistribuicaoFaixaConversao(contratante, data.dataIni, data.dataFim);
            var _dataPoints = new List<DashDataPoint>();

            if (dadosConversao.Count() > 0 || dadosConversao != null)
            {
                foreach (var item in dadosConversao.GroupBy(x=> x.FASE))
                {
                    int quantidadeCpf = item.FirstOrDefault().QUANTIDADE;
                    int cpca = item.Sum(x=> x.CPCA);

                    
                        decimal conversao = (Convert.ToDecimal(cpca) / Convert.ToDecimal(quantidadeCpf)) * 100;

                        _dataPoints.Add(new DashDataPoint(Convert.ToDouble(Math.Round(conversao, 2)), item.Key));
                    
                    
                }
            }

            return _dataPoints;
        }

        public TbDashboard ObterDetalheFaixa(int contratante, string dataInicial = "", string datafinal = "", string faixaNome="")
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataInicial, datafinal);
            var faixaIni = "";
            var faixaFim = "";
            if (faixaNome.Length >= 11)
            {
                faixaIni = faixaNome.Substring(0, 4);
                faixaFim = faixaNome.Substring(7, 4);



                var dadosConversao = _faixaRepository.ObterDetalheFaixa(contratante, dataInicial, datafinal, faixaIni, faixaFim);
                var _dataPoints = new List<DashDataPoint>();
                var dash = new TbDashboard();

                if (dadosConversao.Count() > 0 || dadosConversao != null)
                {
                    dash.FASE = faixaNome;
                    dash.CPC = dadosConversao.Sum(x => x.CPC);
                    dash.QUANTIDADE = dadosConversao.Distinct().Count();
                    dash.CARTEIRA = dadosConversao.FirstOrDefault().QUANTIDADE.ToString();
                    dash.CPCA = dadosConversao.Sum(x => x.CPCA);
                    dash.VALOR = dadosConversao.Sum(x => x.VALOR);
                }

                return dash;
            }

            return null;
            
        }

    }
}
