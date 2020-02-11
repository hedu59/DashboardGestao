using ActyonData.Application.Interfaces;
using ActyonData.Application.Utils;
using ActyonData.Domain.DataContext.Models;
using ActyonData.Domain.DataContext.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ActyonData.Application.Services
{
    public class CarteiraService : ICarteiraService
    {
        private readonly ICarteiraRepository _repository;
        public CarteiraService(ICarteiraRepository repository)
        {
            _repository = repository;
        }

        public List<DashDataPoint> ObterCarteiraAtivas(string dataInicial, string dataFinal, int contId)
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataInicial, dataFinal);

            var dadosCarteira = _repository.ObterCarteiraAtivas( data.dataIni, data.dataFim, contId);
            var _dataPoints = new List<DashDataPoint>();


            if ( dadosCarteira !=null && dadosCarteira.Count > 0)
            {
                var quantidadeDiscagem = dadosCarteira.Count;
                var ALO = dadosCarteira.Where(x => x.ALO == 1).Count();
                var CPC = dadosCarteira.Where(x => x.CPC == 1).Count();
                var CPCA = dadosCarteira.Where(x => x.CPCA == 1).Count();
                var quantidadeCPFs = dadosCarteira.GroupBy(x => x.CPF).Count();
                var SPIN = Math.Round(Convert.ToDouble(quantidadeDiscagem) / Convert.ToDouble(quantidadeCPFs), 2);



                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(quantidadeDiscagem), "Qtde. Discagem"));
                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(ALO), "ALO"));
                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(CPC), "CPC"));
                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(CPCA), "CPCA"));
            //    _dataPoints.Add(new DashDataPoint(Convert.ToDouble(quantidadeCPFs), "Qtde. CPF"));
                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(SPIN), "SPIN"));

            }

            return _dataPoints;
        }

        public List<DashDataPoint> ObterCarteiraAtivasUnique(string dataInicial, string dataFinal, int contId)
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataInicial, dataFinal);

            var dadosCarteira = _repository.ObterCarteiraUnique(data.dataIni, data.dataFim, contId);
            var _dataPoints = new List<DashDataPoint>();


            if (dadosCarteira != null && dadosCarteira.Count > 0)
            {
                var quantidadeDiscagem = dadosCarteira.GroupBy(x=>x.CPF).Count();
                var ALO = dadosCarteira.Where(x => x.ALO == 1).GroupBy(x => x.CPF).Count();
                var CPC = dadosCarteira.Where(x => x.CPC == 1).GroupBy(x=>x.CPF).Count();
                var CPCA = dadosCarteira.Where(x => x.CPCA == 1).GroupBy(x=> x.CPF).Count();
                var quantidadeCPFs = dadosCarteira.GroupBy(x => x.CPF).Count();
                var SPIN = Math.Round(Convert.ToDouble(quantidadeDiscagem) / Convert.ToDouble(quantidadeCPFs), 2);

                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(quantidadeDiscagem), "Qtde. Discagem"));
                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(ALO), "ALO"));
                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(CPC), "CPC"));
                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(CPCA), "CPCA"));
             //   _dataPoints.Add(new DashDataPoint(Convert.ToDouble(quantidadeCPFs), "Qtde. CPF"));
                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(SPIN), "SPIN"));

            }

            return _dataPoints;
        }

        public CarteiraAtiva ObterDetalheCarteira(string dataInicial, string dataFinal, int contId)
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataInicial, dataFinal);

            var dadosCarteira = _repository.ObterCarteiraDetalhe(data.dataIni, data.dataFim, contId);
            var carteira = new CarteiraAtiva();


            if (dadosCarteira != null && dadosCarteira.Count > 0)
            {
                var DISCAGEM = Convert.ToDouble(dadosCarteira.Count());
                var ALO = Convert.ToDouble(dadosCarteira.Where(x => x.ALO == 1).Count());
                var CPC = Convert.ToDouble(dadosCarteira.Where(x => x.CPC == 1).Count());
                var CPCA = dadosCarteira.Where(x => x.CPCA == 1).Count();

                var DISCAGEMUNIQUE = dadosCarteira.Count();
                var ALO_U = Convert.ToDouble(dadosCarteira.Where(x => x.ALO == 1).GroupBy(x => x.CPF).Count());
                var CPC_U = Convert.ToDouble(dadosCarteira.Where(x => x.CPC == 1).GroupBy(x => x.CPF).Count());
                var CPCA_U = Convert.ToDouble(dadosCarteira.Where(x => x.CPCA == 1).GroupBy(x => x.CPF).Count());

                double? ALOATIVO = (ALO/ DISCAGEM) * 100;
                double? CPCATIVO = (CPC / ALO) * 100;
                double? CPCAATIVO = (CPCA / CPC) * 100;

                double? ALO_UNIQUE = (ALO_U / DISCAGEMUNIQUE) * 100;
                double? CPC_UNIQUE = (CPC_U / ALO_U) * 100;
                double? CPCA_UNIQUE = (CPCA_U / CPC_U) * 100;

                var CARTEIRAATIVA = _repository.ObterCarteiraAtiva(contId);
                var SPIN = Math.Round(DISCAGEM / Convert.ToDouble(CARTEIRAATIVA), 2);
               
                carteira.DISCAGEM_ATIVA = Convert.ToInt32(DISCAGEM);
                carteira.ALO_ATIVO = Math.Round(Convert.ToDouble(ALOATIVO), 2); 
                carteira.CPC_ATIVO = Math.Round(Convert.ToDouble(CPCATIVO), 2);
                carteira.CPCA_ATIVO = Math.Round(Convert.ToDouble(CPCAATIVO), 2); 

                carteira.DISCAGEM_UNIQUE = Convert.ToInt32(dadosCarteira.GroupBy(x => x.CPF).Count());
                carteira.ALO_UNIQUE = Math.Round(Convert.ToDouble(ALO_UNIQUE),2);
                carteira.CPC_UNIQUE = Math.Round(Convert.ToDouble(CPC_UNIQUE),2);
                carteira.CPCA_UNIQUE = Math.Round(Convert.ToDouble(CPCA_UNIQUE),2);

                carteira.ALO_ATIVO_ESFORCO = Math.Round((Convert.ToDouble(ALO) / CARTEIRAATIVA) * 100,2);
                carteira.CPC_ATIVO_ESFORCO = Math.Round((Convert.ToDouble(CPC) / CARTEIRAATIVA) * 100, 2);
                carteira.CPCA_ATIVO_ESFORCO = Math.Round((Convert.ToDouble(CPCA) / CARTEIRAATIVA) * 100, 2);

                carteira.ALO_UNIQUE_ESFORCO = Math.Round((Convert.ToDouble(ALO_U) / carteira.DISCAGEM_UNIQUE) * 100, 2);
                carteira.CPC_UNIQUE_ESFORCO = Math.Round((Convert.ToDouble(CPC_U) / carteira.DISCAGEM_UNIQUE) * 100, 2);
                carteira.CPCA_UNIQUE_ESFORCO = Math.Round((Convert.ToDouble(CPCA_U) / carteira.DISCAGEM_UNIQUE) * 100, 2);

                carteira.QUANTIDADE_CPF = CARTEIRAATIVA;
                carteira.SPIN = SPIN;
            
            }

            return carteira;
        }

        public List<DashDataPoint> ObterEsforcoUnique(int contId, string dataInicial, string dataFinal)
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataInicial, dataFinal);

            var dadosCarteira = _repository.ObterCarteiraUnique(data.dataIni, data.dataFim, contId);
            var _dataPoints = new List<DashDataPoint>();
            var carteira = new CarteiraAtiva();

            if (dadosCarteira != null && dadosCarteira.Count > 0)
            {
                var DISCAGEMUNIQUE = dadosCarteira.Count();
                var ALO = Convert.ToDouble(dadosCarteira.Where(x => x.ALO == 1).Count());
                var CPC = Convert.ToDouble(dadosCarteira.Where(x => x.CPC == 1).Count());
                var CPCA = dadosCarteira.Where(x => x.CPCA == 1).Count();

                var ALO_U = Convert.ToDouble(dadosCarteira.Where(x => x.ALO == 1).GroupBy(x => x.CPF).Count());
                var CPC_U = Convert.ToDouble(dadosCarteira.Where(x => x.CPC == 1).GroupBy(x => x.CPF).Count());
                var CPCA_U = Convert.ToDouble(dadosCarteira.Where(x => x.CPCA == 1).GroupBy(x => x.CPF).Count());

                carteira.ALO_UNIQUE_ESFORCO = Math.Round((Convert.ToDouble(ALO_U) / DISCAGEMUNIQUE) * 100, 2);
                carteira.CPC_UNIQUE_ESFORCO = Math.Round((Convert.ToDouble(CPC_U) / DISCAGEMUNIQUE) * 100, 2);
                carteira.CPCA_UNIQUE_ESFORCO = Math.Round((Convert.ToDouble(CPCA_U) / DISCAGEMUNIQUE) * 100, 2);

                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(carteira.ALO_UNIQUE_ESFORCO), "ESFORÇO-ALO"));
                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(carteira.CPC_UNIQUE_ESFORCO), "ESFORÇO-CPC"));
                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(carteira.CPCA_UNIQUE_ESFORCO), "ESFORÇO-CPCA"));

            }

            return _dataPoints;
        }

        public List<DashDataPoint> ObterEsforcoAtiva(int contId, string dataInicial, string dataFinal)
        {
            var valida = new ValidaFiltro();
            var data = valida.ValidaFiltrosData(dataInicial, dataFinal);
            var _dataPoints = new List<DashDataPoint>();

            var dadosCarteira = _repository.ObterCarteiraUnique(data.dataIni, data.dataFim, contId);          
            var carteira = new CarteiraAtiva();

            if (dadosCarteira != null && dadosCarteira.Count > 0)
            {
                var DISCAGEM = Convert.ToDouble(dadosCarteira.Count());
                var ALO = Convert.ToDouble(dadosCarteira.Where(x => x.ALO == 1).Count());
                var CPC = Convert.ToDouble(dadosCarteira.Where(x => x.CPC == 1).Count());
                var CPCA = dadosCarteira.Where(x => x.CPCA == 1).Count();
                var CARTEIRAATIVA = _repository.ObterCarteiraAtiva(contId);

                carteira.ALO_ATIVO_ESFORCO = Math.Round((Convert.ToDouble(ALO) / CARTEIRAATIVA) * 100, 2);
                carteira.CPC_ATIVO_ESFORCO = Math.Round((Convert.ToDouble(CPC) / CARTEIRAATIVA) * 100, 2);
                carteira.CPCA_ATIVO_ESFORCO = Math.Round((Convert.ToDouble(CPCA) / CARTEIRAATIVA) * 100, 2);

                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(carteira.ALO_ATIVO_ESFORCO), "ESFORÇO-ALO"));
                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(carteira.CPC_ATIVO_ESFORCO), "ESFORÇO-CPC"));
                _dataPoints.Add(new DashDataPoint(Convert.ToDouble(carteira.CPCA_ATIVO_ESFORCO), "ESFORÇO-CPCA"));

            }

            return _dataPoints;
        }

       public  List<FunilAtendimento> ObterFunilAtendimento(int contratante, string dataInicial, string dataFinal)
        {
            return null;
        }
    }
}
