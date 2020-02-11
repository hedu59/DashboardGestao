using ActyonData.Domain.DataContext.Entities;
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
    public class DistribuicaoFaixaRepository: IDistribuicaoFaixaRepository
    {

        private readonly ActyonDataContext _actyonContext;

        public DistribuicaoFaixaRepository(ActyonDataContext actyonContext)
        {
            _actyonContext = actyonContext;
        }

        public List<TbDashboard> ObterDistribuicaoFaixaCPF(int contratante, string dataInicial = "", string datafinal = "")
        {
            string strConsulta = @" SET LANGUAGE us_english
                                    SELECT 
                                    distinct(COUNT (CPF)) as QUANTIDADE,CPF,
                                    isnull((SELECT NOME FROM TBCONTRATANTE_FASE F WHERE F.CONT_ID = D.CONT_ID AND D.FAIXA_ATRASO BETWEEN F.FAIXA_INIC AND F.FAIXA_FINAL ), 'SEM FASE') FASE
                                    FROM TBDASHBOARD D
                                    WHERE CONT_ID =" + contratante +
                                    "AND DATA_INSERT BETWEEN '"+dataInicial+"' and '"+datafinal+"'"+
                                    "GROUP BY CONT_ID, FAIXA_ATRASO,CPF ORDER BY 2";

            var result = _actyonContext.Connection.Query<TbDashboard>(strConsulta).ToList();

            return result;
        }

        public List<TbDashboard> ObterDistribuicaoFaixaValor(int contratante, string dataInicial = "", string datafinal = "")
        {
            string strConsulta = @" SET LANGUAGE us_english
                                    SELECT 
                                    isnull((SELECT NOME FROM TBCONTRATANTE_FASE F WHERE F.CONT_ID = D.CONT_ID AND D.FAIXA_ATRASO BETWEEN F.FAIXA_INIC AND F.FAIXA_FINAL ), 'SEM FASE') FASE, SUM (VALOR) VALOR
                                    FROM TBDASHBOARD D
                                    WHERE CONT_ID =" + contratante +
                                    "AND DATA_INSERT BETWEEN '" + dataInicial + "' and '" + datafinal + "'" +
                                    "GROUP BY CONT_ID, FAIXA_ATRASO";

            var result = _actyonContext.Connection.Query<TbDashboard>(strConsulta).ToList();

            return result;
        }
        public List<TbDashboard> ObterDistribuicaoFaixaTicket(int contratante, string dataInicial = "", string datafinal = "")
        {
            string strConsulta = @"
                                    SET LANGUAGE us_english
                                    SELECT isnull((SELECT NOME FROM TBCONTRATANTE_FASE F WHERE F.CONT_ID = D.CONT_ID AND D.FAIXA_ATRASO BETWEEN F.FAIXA_INIC AND F.FAIXA_FINAL ), 'SEM FASE') FASE, (SUM(VALOR)/COUNT(CPF)) VALOR_TICKET
                                    FROM TBDASHBOARD D
                                    WHERE DATA_INSERT BETWEEN '" + dataInicial + "' and '" + datafinal + "'" +
                                    "AND CONT_ID =" + contratante+
									"GROUP BY CONT_ID, FAIXA_ATRASO";

            var result = _actyonContext.Connection.Query<TbDashboard>(strConsulta).ToList();

            return result;
        }
        public List<TbDashboard> ObterDistribuicaoFaixaCPC(int contratante, string dataInicial = "", string datafinal = "")
        {
            string strConsulta = @" SET LANGUAGE us_english
                                    SELECT isnull((SELECT NOME FROM TBCONTRATANTE_FASE F WHERE F.CONT_ID = D.CONT_ID AND D.FAIXA_ATRASO BETWEEN F.FAIXA_INIC AND F.FAIXA_FINAL ), 'SEM FASE') FASE, CPC
                                    FROM TBDASHBOARD D
                                    WHERE DATA_INSERT BETWEEN '" + dataInicial + "' and '" + datafinal + "'" +
                                    "AND CONT_ID ="+contratante+
									@"AND CPC = 1
									GROUP BY CONT_ID, FAIXA_ATRASO, CPC";

            var result = _actyonContext.Connection.Query<TbDashboard>(strConsulta).ToList();

            return result;
        }
        public List<TbDashboard> ObterDistribuicaoFaixaCPCA(int contratante, string dataInicial = "", string datafinal = "")
        {
            string strConsulta = @" SET LANGUAGE us_english
                                    SELECT isnull((SELECT NOME FROM TBCONTRATANTE_FASE F WHERE F.CONT_ID = D.CONT_ID AND D.FAIXA_ATRASO BETWEEN F.FAIXA_INIC AND F.FAIXA_FINAL ), 'SEM FASE') FASE, CPCA
                                    FROM TBDASHBOARD D
                                    WHERE DATA_INSERT BETWEEN '" + dataInicial + "' and '" + datafinal + "'" +
                                    "AND CONT_ID =" + contratante +
                                    @"AND CPCA = 1
									GROUP BY CONT_ID, FAIXA_ATRASO, CPCA";

            var result = _actyonContext.Connection.Query<TbDashboard>(strConsulta).ToList();

            return result;
        }
        public List<TbDashboard> ObterDistribuicaoFaixaConversao(int contratante, string dataInicial = "", string datafinal = "")
        {
            try
            {
                var strConsulta = @"
                                    SET LANGUAGE us_english
                                    SELECT distinct (CPF),isnull((SELECT NOME FROM TBCONTRATANTE_FASE F WHERE F.CONT_ID = D.CONT_ID AND D.FAIXA_ATRASO BETWEEN F.FAIXA_INIC AND F.FAIXA_FINAL ), 'SEM FASE') FASE, 
									SUM(VALOR) AS VALOR, 
									1 as CPF,
                                    CPCA,
									(SELECT COUNT(CPF) FROM TBDASHBOARD D WHERE D.CPF = CPF AND CONT_ID = " + contratante + " AND DATA_INSERT BETWEEN '" + dataInicial + "' AND '" + datafinal + "') QUANTIDADE " +
                                    @" FROM TBDASHBOARD D WHERE  CONT_ID =" + contratante +
                                    " AND DATA_INSERT BETWEEN '" + dataInicial + "' AND '" + datafinal + "'" +
                                    @" GROUP BY CONT_ID, CPCA,FAIXA_ATRASO, CPF
									    ORDER by 2";

                var result = _actyonContext.Connection.Query<TbDashboard>(strConsulta).ToList();

                return result;
            }
            catch (Exception ex)
            {

                return null ;
            }
            
        }
        public List<TbDashboard> ObterDetalheFaixa(int contratante, string dataInicial = "", string datafinal = "", string faixaIni="", string faixaFim="")
        {
            var strConsulta = @"    SET LANGUAGE us_english
                                    SELECT distinct (CPF),isnull((SELECT NOME FROM TBCONTRATANTE_FASE F WHERE F.CONT_ID = D.CONT_ID AND D.FAIXA_ATRASO BETWEEN F.FAIXA_INIC AND F.FAIXA_FINAL ), 'SEM FASE') FASE, 
									SUM(VALOR) AS VALOR, 									
									1 as CPF,
									CPCA,

									(SELECT COUNT(CPF) FROM TBDASHBOARD D WHERE D.CPF = CPF AND CONT_ID = " + contratante+" AND DATA_INSERT BETWEEN '"+dataInicial+"' AND '"+datafinal+"') QUANTIDADE"+
										" FROM TBDASHBOARD D"+
										" WHERE  CONT_ID = " +contratante+
										" AND FAIXA_ATRASO BETWEEN "+faixaIni+" AND "+faixaFim+
									    " GROUP BY CONT_ID, CPCA,FAIXA_ATRASO, CPF"+
									    " ORDER by 2";

            var result = _actyonContext.Connection.Query<TbDashboard>(strConsulta).ToList();

            return result;
        }
    }
}
