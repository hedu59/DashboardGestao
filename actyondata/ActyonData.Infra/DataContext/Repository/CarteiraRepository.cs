using ActyonData.Domain.DataContext.Models;
using ActyonData.Domain.DataContext.Repository;
using ActyonData.Infra.DataContext.Context;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ActyonData.Infra.DataContext.Repository
{
    public class CarteiraRepository: ICarteiraRepository
    {
        private readonly ActyonDataContext _actyonContext;

        public CarteiraRepository(ActyonDataContext actyonContext)
        {
            _actyonContext = actyonContext;
        }

        public List<CarteiraAtiva> ObterCarteiraAtivas(string dataInicial, string dataFinal, int contId)
        {
            var strConsulta = @"SET LANGUAGE us_english
                                SELECT CPF , ALO, CPC, CPCA, OCORRENCIA_ID 
                                FROM TBDASHBOARD 
                                WHERE DATA_INSERT BETWEEN '" + dataInicial + "'   AND  '" + dataFinal + "' " +
                                "AND CONT_ID =" + contId;

            var result = _actyonContext.Connection.Query<CarteiraAtiva>(strConsulta).ToList();

            return result;
        }

        public List<CarteiraAtiva> ObterCarteiraUnique(string dataInicial, string dataFinal, int contId)
        {
            var strConsulta = @"
                                SET LANGUAGE us_english
                                SELECT CPF , ALO, CPC, CPCA, OCORRENCIA_ID 
                                FROM TBDASHBOARD 
                                WHERE DATA_INSERT BETWEEN '" + dataInicial + "'   AND '" + dataFinal + "'" +
                                "AND CONT_ID =" + contId;

            var result = _actyonContext.Connection.Query<CarteiraAtiva>(strConsulta).ToList();

            return result;
        }

        public List<CarteiraAtiva> ObterCarteiraDetalhe(string dataInicial, string dataFinal, int contId)
        {
            var strConsulta = @"
                                SET LANGUAGE us_english
                                SELECT CPF , ALO, CPC, CPCA, OCORRENCIA_ID 
                                FROM TBDASHBOARD 
                                WHERE DATA_INSERT BETWEEN '" + dataInicial + "'   AND  '" + dataFinal + "' " +
                                "AND CONT_ID =" + contId;

            var result = _actyonContext.Connection.Query<CarteiraAtiva>(strConsulta).ToList();

            return result;
        }

        public int ObterCarteiraAtiva(int contId)
        {
            var consulta = @"SET LANGUAGE us_english select count(distinct(DEVEDOR_ID)) CARTEIRA_ATIVA from tbtitulo T where T.CONT_ID = " + contId + " and valor> 0";

            var result = _actyonContext.Connection.Query<int>(consulta).FirstOrDefault();

            return result;
        }
    }
}
