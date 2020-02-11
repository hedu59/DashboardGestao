using ActyonData.Application.Interfaces;
using ActyonData.Domain.DataContext.Entities;
using ActyonData.Domain.DataContext.Models;
using ActyonData.Domain.DataContext.Repository;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace ActyonData.Application.Services
{
    public class ProducaoService: IProducaoService
    {
        private readonly IProducaoRespository _repository;

        public ProducaoService(IProducaoRespository repository)
        {
            _repository = repository;
        }

        public List<DashDataPoint> ObterPagamentosContratantes(string dataInicial , string datafinal )
        {

            string data = DateTime.Now.ToString("yyyy-MM-01");

            if (dataInicial == "")
            {
                dataInicial = data;
            }

            var RankingPagamento = new List<TbTituloPago>();
            var RankingPagamentoValor = new List<TbTituloPago>();
            var _dataPoints = new List<DashDataPoint>();

            RankingPagamento = _repository.ObterPagamentosContratantes(dataInicial,datafinal);
            

            if (RankingPagamento.Count == 0)
            {
                _dataPoints.Add(new DashDataPoint(0.0, 0));
            }
            else
            {
                foreach (var item in RankingPagamento)
                {
                    item.VALOR_RECEBIDO_DOUBLE = Convert.ToDouble(item.VALOR_RECEBIDO);
                    RankingPagamentoValor.Add(item);
                }

                foreach (var item in RankingPagamentoValor.OrderByDescending(x=> x.VALOR_RECEBIDO_DOUBLE).ToList())
                {
                    _dataPoints.Add(new DashDataPoint(item.VALOR_RECEBIDO_DOUBLE, item.FANTASIA));
                }
            }

            return _dataPoints;
        }

        public string ObterSomaPagamentos(string dataInicial, string datafinal)
        {
            string data = DateTime.Now.ToString("yyyy-MM-01");

            var RankingPagamento = new List<TbTituloPago>();
            var RankingPagamentoValor = new List<TbTituloPago>();
            var _dataPoints = new List<DashDataPoint>();

            RankingPagamento = _repository.ObterPagamentosContratantes(dataInicial, datafinal);
            var totalRecebido = "";

            if (RankingPagamento.Count == 0)
            {
                _dataPoints.Add(new DashDataPoint(0.0, 0));
            }
            else
            {
                foreach (var item in RankingPagamento)
                {
                    item.VALOR_RECEBIDO_DOUBLE = Convert.ToDouble(item.VALOR_RECEBIDO);
                    RankingPagamentoValor.Add(item);
                }

                totalRecebido = String.Format(CultureInfo.GetCultureInfo("pt-BR"), "{0:n}", RankingPagamentoValor.Sum(x => x.VALOR_RECEBIDO_DOUBLE));
            }


            return totalRecebido;
        }

        public List<DashDataPoint> ObterAcordosPorContratantes(string dataInicial, string datafinal)
        {
            string data = DateTime.Now.ToString("yyyy-MM-dd");
            var RankingAcordo = new List<TbAcordo>();
            var RankingAcordoTribanco = new List<TbAcordo>();
            var RankingAcordoCorrigido = new List<TbAcordo>();
            var RankingAcordoCorrigidoOrdenado = new List<TbAcordo>();
            var _dataPoints = new List<DashDataPoint>();


            RankingAcordoTribanco = _repository.ObterValoresAcordosOperadorCarteiraTribanco(dataInicial, datafinal);
            RankingAcordo = _repository.ObterValoresAcordosOperadorCarteira(dataInicial, datafinal);

            if (1==1) //ADICIONADO O CONT_ID PARA NÃO INTERFERIR NAS DEMAIS CARTEIRAS E O LAYOUT_ID EH USADO EM MAIS DE UMA CARTEIRA.
            {
               
                foreach (var item in RankingAcordo)
                {

                    if (item.VALOR_RECEBIDO == "0,00" && item.VALOR_ENTRADA == 0)
                    {
                        if (item.QTDE_NOVA_PRESTACAO_ACORDO == 0) item.QTDE_NOVA_PRESTACAO_ACORDO = 1;
                        item.VALOR_RECEBIDO = (item.VALOR_ACORDO / item.QTDE_NOVA_PRESTACAO_ACORDO).ToString();
                        item.VALOR_RECEBIDO_AUX = (item.VALOR_ACORDO / item.QTDE_NOVA_PRESTACAO_ACORDO);
                    }

                    if (item.VALOR_ENTRADA != 0)
                    {
                        item.VALOR_RECEBIDO = item.VALOR_ENTRADA.ToString();
                        item.VALOR_RECEBIDO_AUX = item.VALOR_ENTRADA;
                    }

                    RankingAcordoCorrigido.Add(item);

                }


                if (RankingAcordoCorrigido.Count == 0)
                {
                    _dataPoints.Add(new DashDataPoint(0.0, 0));  //Sum(x=> Convert.ToDecimal(x.VALOR_RECEBIDO))

                }
                else
                {
                   

                    foreach (var item in RankingAcordoCorrigido.OrderByDescending(x => x.VALOR_RECEBIDO_AUX).GroupBy(x => x.OPERADOR_ID))
                    {
                        var valor = item.Sum(x => Convert.ToDecimal(x.VALOR_RECEBIDO));


                        _dataPoints.Add(new DashDataPoint(Convert.ToDouble(valor), item.FirstOrDefault().OPERADOR_ID, Convert.ToString(item.FirstOrDefault().COBRADOR_ID)));
                    }
                }

                return _dataPoints;
            }
            else
            {
                RankingAcordo = _repository.ObterValoresAcordosOperadorCarteira(dataInicial, datafinal);

                if (RankingAcordo.Count == 0)
                {
                    _dataPoints.Add(new DashDataPoint(0.0, 0));
                }
                else
                {
                    foreach (var item in RankingAcordo)
                    {

                        _dataPoints.Add(new DashDataPoint(Convert.ToDouble(item.VALOR_RECEBIDO), item.OPERADOR_ID, Convert.ToString(item.COBRADOR_ID)));
                    }
                }

                return _dataPoints;
            }

        }


    }
}
