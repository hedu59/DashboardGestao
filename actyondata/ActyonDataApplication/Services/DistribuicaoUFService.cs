using ActyonData.Application.Interfaces;
using ActyonData.Application.Utils;
using ActyonData.Domain.DataContext.Models;
using ActyonData.Domain.DataContext.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ActyonData.Application.Services
{
    public class DistribuicaoUFService: IDistribuicaoUFService
    {
        private readonly IDistribuicaoUFRepository _ufRepository;
        public DistribuicaoUFService (IDistribuicaoUFRepository ufRepository)
        {
            _ufRepository = ufRepository;
        }

        public List<DashDataPoint> ObterDistribuicaoUFxCPF(int contratante, string dataini, string datafim)
        {

            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataini, datafim);

            var dadosUFCPF = _ufRepository.ObterQuantidadeUFCPF(contratante, data.dataIni, data.dataFim);          
            var _dataPoints = new List<DashDataPoint>();


            if(dadosUFCPF.Count() > 0)
            {
                foreach (var item in dadosUFCPF)
                {
                    _dataPoints.Add(new DashDataPoint(Convert.ToDouble(item.QUANTIDADE), item.UF, "R$" + item.VALOR.ToString()));
                }
            }
       
            
            return _dataPoints;
        }

        public List<DashDataPoint> ObterDistribuicaoUFxValor(int contratante, string dataini, string datafim)
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataini, datafim);

            var dadosVALOR = _ufRepository.ObterValorPorUF(contratante, data.dataIni, data.dataFim);
            var _dataPoints = new List<DashDataPoint>();


            if (dadosVALOR.Count() > 0)
            {
                foreach (var item in dadosVALOR)
                {
                    _dataPoints.Add(new DashDataPoint(Convert.ToDouble(item.VALOR), item.UF));
                }
            }


            return _dataPoints;

        }

        public List<DashDataPoint> ObterDistribuicaoUFxTicket(int contratante, string dataini, string datafim)
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataini, datafim);

            var dadosVALOR = _ufRepository.ObterTicketMedio(contratante, data.dataIni, data.dataFim);
            var _dataPoints = new List<DashDataPoint>();


            if (dadosVALOR.Count() > 0)
            {
                foreach (var item in dadosVALOR)
                {
                    _dataPoints.Add(new DashDataPoint(Convert.ToDouble(Math.Round( item.VALOR_TICKET,2)), item.UF));
                }
            }


            return _dataPoints;

        }

        public List<DashDataPoint> ObterValorRegiao(int contratante, string dataini, string datafim)
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataini, datafim);

            var dadosVALOR = _ufRepository.ObterValorRegiao(contratante, data.dataIni, data.dataFim);
            var _dataPoints = new List<DashDataPoint>();

            var regiao = new List<Regiao>();

            

            if (dadosVALOR.Count() > 0 || dadosVALOR != null)
            {

                foreach (var item in dadosVALOR)
                {
                    var objRegiao = new Regiao();

                    if (item.UF == "SP" || item.UF == "RJ" || item.UF == "ES" || item.UF == "MG")
                    {
                        objRegiao.SIGLA = "SUDESTE";
                        objRegiao.VALOR += item.VALOR;

                        regiao.Add(objRegiao);
                    }

                    if (item.UF == "CE" || item.UF == "RN" || item.UF == "MA" || item.UF == "PB" || item.UF == "SE" || item.UF == "BA" || item.UF == "AL" || item.UF == "PI" || item.UF == "PE")
                    {
                        objRegiao.SIGLA = "NORDESTE";
                        objRegiao.VALOR += item.VALOR;

                        regiao.Add(objRegiao);
                    }

                    if (item.UF == "AM" || item.UF == "RR" || item.UF == "RO" || item.UF == "AC" || item.UF == "PA" || item.UF == "AP" || item.UF == "TO")
                    {
                        objRegiao.SIGLA = "NORTE";
                        objRegiao.VALOR += item.VALOR;

                        regiao.Add(objRegiao);
                    }
                    if (item.UF == "PR" || item.UF == "RG" || item.UF == "SC")
                    {
                        objRegiao.SIGLA = "SUL";
                        objRegiao.VALOR += item.VALOR;

                        regiao.Add(objRegiao);
                    }
                    if (item.UF == "MT" || item.UF == "MS" || item.UF == "DF" || item.UF == "GO")
                    {
                        objRegiao.SIGLA = "CENTRO-OESTE";
                        objRegiao.VALOR += item.VALOR;

                        regiao.Add(objRegiao);
                    }
                }


                foreach (var item in regiao.GroupBy(x=> x.SIGLA))
                {
                    _dataPoints.Add(new DashDataPoint(Convert.ToDouble(Math.Round(item.Sum(x=> x.VALOR), 2)), item.Key));
                }

            }


            return _dataPoints;
        }

        public List<DashDataPoint> ObterTicketRegiao(int contratante, string dataini, string datafim)
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataini, datafim);

            var dadosVALOR = _ufRepository.ObterTicketRegiao(contratante, data.dataIni, data.dataFim);
            var _dataPoints = new List<DashDataPoint>();

            var regiao = new List<Regiao>();

            if (dadosVALOR.Count() > 0 || dadosVALOR != null)
            {

                foreach (var item in dadosVALOR)
                {
                    var objRegiao = new Regiao();

                    if (item.UF == "SP" || item.UF == "RJ" || item.UF == "ES" || item.UF == "MG")
                    {
                        objRegiao.SIGLA = "SUDESTE";
                        objRegiao.VALOR += item.VALOR_TICKET;

                        regiao.Add(objRegiao);
                    }

                    if (item.UF == "CE" || item.UF == "RN" || item.UF == "MA" || item.UF == "PB" || item.UF == "SE" || item.UF == "BA" || item.UF == "AL" || item.UF == "PI" || item.UF == "PE")
                    {
                        objRegiao.SIGLA = "NORDESTE";
                        objRegiao.VALOR += item.VALOR_TICKET;

                        regiao.Add(objRegiao);
                    }

                    if (item.UF == "AM" || item.UF == "RR" || item.UF == "RO" || item.UF == "AC" || item.UF == "PA" || item.UF == "AP" || item.UF == "TO")
                    {
                        objRegiao.SIGLA = "NORTE";
                        objRegiao.VALOR += item.VALOR_TICKET;

                        regiao.Add(objRegiao);
                    }
                    if (item.UF == "PR" || item.UF == "RG" || item.UF == "SC")
                    {
                        objRegiao.SIGLA = "SUL";
                        objRegiao.VALOR += item.VALOR_TICKET;

                        regiao.Add(objRegiao);
                    }
                    if (item.UF == "MT" || item.UF == "MS" || item.UF == "DF" || item.UF == "GO")
                    {
                        objRegiao.SIGLA = "CENTRO-OESTE";
                        objRegiao.VALOR += item.VALOR_TICKET;

                        regiao.Add(objRegiao);
                    }
                }


                foreach (var item in regiao.GroupBy(x => x.SIGLA))
                {
                    _dataPoints.Add(new DashDataPoint(Convert.ToDouble(Math.Round(item.Sum(x => x.VALOR), 2)), item.Key));
                }
              
            }


            return _dataPoints;
        }

        public List<DashDataPoint> ObterConversao(int contratante, string dataini, string datafim)
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataini, datafim);

            var dadosConversao = _ufRepository.ObterConversao(contratante, data.dataIni, data.dataFim);
            var _dataPoints = new List<DashDataPoint>();

            if (dadosConversao.Count() > 0 || dadosConversao != null)
            {              
                foreach (var item in dadosConversao)
                {
                    int quantidadeCpf = item.QUANTIDADE;
                    int cpca = item.CPCA;

                    decimal conversao = (Convert.ToDecimal(cpca)/ Convert.ToDecimal(quantidadeCpf)) * 100;

                    _dataPoints.Add(new DashDataPoint(Convert.ToDouble(Math.Round(conversao,2)), item.UF));
                }
            }


            return _dataPoints;
        }
    }
}
