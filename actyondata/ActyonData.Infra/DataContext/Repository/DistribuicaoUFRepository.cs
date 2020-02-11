using ActyonData.Domain.DataContext.Entities;
using ActyonData.Domain.DataContext.Repository;
using ActyonData.Infra.DataContext.Context;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ActyonData.Infra.DataContext.Repository
{
    public class DistribuicaoUFRepository: IDistribuicaoUFRepository
    {
        private readonly ActyonDataContext _actyonContext;

        public DistribuicaoUFRepository(ActyonDataContext context)
        {
            _actyonContext = context;
        }

        public List<TbDashboard> ObterQuantidadeUFCPF(int ContId, string DataIni, string DataFim)
        {
            try
            {
                var strConsulta = @" SET LANGUAGE us_english SELECT COUNT(UF) QUANTIDADE, UF, SUM(VALOR)VALOR 
                                    FROM TBDASHBOARD 
                                    WHERE DATA_INSERT BETWEEN '" + DataIni + "' AND '" + DataFim + "' AND CONT_ID =" + ContId +
                                   "GROUP BY UF ORDER BY QUANTIDADE";

                var result = _actyonContext.Connection.Query<TbDashboard>(strConsulta).ToList();

                return result;
            }
            catch (Exception ex)
            {

                return null;
            }
           
        }

        public List<TbDashboard> ObterValorPorUF(int ContId, string DataIni, string DataFim)
        {
            try
            {
                var strConsulta = @" SET LANGUAGE us_english SELECT UF, SUM(VALOR)VALOR 
                                    FROM TBDASHBOARD 
                                    WHERE DATA_INSERT BETWEEN '" + DataIni + "' AND '" + DataFim + "' AND CONT_ID =" + ContId +
                                   "GROUP BY UF";

                var result = _actyonContext.Connection.Query<TbDashboard>(strConsulta).ToList();

                return result;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public List<TbDashboard> ObterTicketMedio(int ContId, string DataIni, string DataFim)
        {
            try
            {
                var strConsulta = @" SET LANGUAGE us_english SELECT UF, SUM(VALOR)/COUNT(CPF) VALOR_TICKET
                                    FROM TBDASHBOARD 
                                    WHERE DATA_INSERT BETWEEN '" + DataIni+"' AND '"+DataFim+"'"+
                                    "AND CONT_ID = "+ ContId + "GROUP BY UF";

                var result = _actyonContext.Connection.Query<TbDashboard>(strConsulta).ToList();

                return result;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public List<TbDashboard> ObterConversao(int ContId, string DataIni, string DataFim)
        {
            try
            {
                var strConsulta = @"SET LANGUAGE us_english SELECT UF, SUM(CPCA) CPCA,
                                    (SELECT COUNT(CPF) FROM tbdashboard D where D.CPF = CPF and CONT_ID = " + ContId+" AND DATA_INSERT BETWEEN '"+DataIni+"' AND '"+DataFim+"') QUANTIDADE"+
                                    @" FROM TBDASHBOARD WHERE DATA_INSERT BETWEEN '"+DataIni+"' AND '"+DataFim+"'"+
                                    " AND CONT_ID = "+ContId+
                                   @" AND CPCA = 1
                                    GROUP BY UF
                                    ORDER BY 1,2";

                var result = _actyonContext.Connection.Query<TbDashboard>(strConsulta).ToList();

                return result;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public List<TbDashboard> ObterValorRegiao(int ContId, string DataIni, string DataFim)
        {
            try
            {
                var strConsulta = @"SET LANGUAGE us_english SELECT UF, SUM(VALOR)VALOR 
                                    FROM TBDASHBOARD 
                                    WHERE DATA_INSERT BETWEEN '" + DataIni + "' AND '" + DataFim + "' AND CONT_ID =" + ContId +
                                   "GROUP BY UF";

                var result = _actyonContext.Connection.Query<TbDashboard>(strConsulta).ToList();

                return result;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public List<TbDashboard> ObterTicketRegiao(int ContId, string DataIni, string DataFim)
        {
            try
            {
                var strConsulta = @" SET LANGUAGE us_english SELECT UF, SUM(VALOR)/COUNT(CPF) VALOR_TICKET
                                    FROM TBDASHBOARD 
                                    WHERE DATA_INSERT BETWEEN '" + DataIni + "' AND '" + DataFim + "'" +
                                    "AND CONT_ID = " + ContId + "GROUP BY UF";

                var result = _actyonContext.Connection.Query<TbDashboard>(strConsulta).ToList();

                return result;
            }
            catch (Exception ex)
            {

                return null;
            }
        }
    }
}
