using ActyonData.Domain.DataContext.Entities;
using ActyonData.Domain.DataContext.Repository;
using ActyonData.Infra.DataContext.Context;
using Dapper;
using System.Collections.Generic;
using System.Linq;

namespace ActyonData.Infra.DataContext.Repository
{
    public class ProducaoRepository: IProducaoRespository
    {
        private readonly ActyonDataContext _context;

        public ProducaoRepository(ActyonDataContext context)
        {
            _context = context;
        }

        public List<TbTituloPago> ObterPagamentosContratantes(string dataInicial = "", string datafinal = "")
        {
            var strConsulta = @"select 
                                case CONT_ID when 16 then (

                                    select SUM(VALOR) VALOR_RECEBIDO 
                                    from tbtitulo_pago_dashboard 
                                    where CONT_ID = 16 
                                    and TIPO_TITULO_ID = 0
                                    and DATA_PAGTO between convert(date,'"+dataInicial+"') and convert(date,'"+datafinal+"')"+ 
                                @")
                                
                                else SUM(VALOR) END VALOR_RECEBIDO, 
                                CONT_ID, 
                                FANTASIA

                                from tbtitulo_pago_dashboard D 
                                inner join tbcontratante C on D.CONT_ID = CONTRATANTE_ID 
                                where DATA_PAGTO between convert(date,'" + dataInicial + "') and convert(date,'" + datafinal + "')" +
                                "group by CONT_ID,FANTASIA order by 1 desc";

            
            return _context.Connection.Query<TbTituloPago>(strConsulta).ToList();
        }

        public List<TbAcordo> ObterValoresAcordosOperadorCarteiraTribanco(string dataInicial = "", string datafinal = "")
        {

            string sql = @"SELECT  A.USUARIO_INCLUSAO 'OPERADOR_ID',
								COBRADOR_ID, sum(VALOR_ENTRADA) VALOR_ENTRADA,
								sum(VALOR_ACORDO) as VALOR_ACORDO, 
								SUM(VALOR_NOVA_PARCELA) VALOR_RECEBIDO, 
								QTDE_NOVA_PRESTACAO_ACORDO
									FROM TBACORDO A INNER JOIN TBOPERADOR O on A.USUARIO_INCLUSAO = O.OPERADOR_ID
									WHERE CONT_ID = 69								
									AND CANCEL <> 1
									AND A.DATA_INCLUSAO  between convert(datetime,'" + dataInicial + "') and convert(datetime,'" + datafinal + "')" +
                                    @"AND O.SE_ADMI <> 1
									GROUP BY A.USUARIO_INCLUSAO, COBRADOR_ID, VALOR_ENTRADA, QTDE_NOVA_PRESTACAO_ACORDO
									ORDER BY 1 DESC";

            return _context.Connection.Query<TbAcordo>(sql).ToList();

        }

        public List<TbAcordo> ObterValoresAcordosOperadorCarteira(string dataInicial = "", string datafinal = "")
        {

                string sql = @"SELECT A.USUARIO_INCLUSAO 'OPERADOR_ID',COBRADOR_ID, sum(isnull(VALOR_ENTRADA,'0.00')) VALOR_ENTRADA, sum(VALOR_ACORDO) as VALOR_ACORDO, SUM(VALOR_NOVA_PARCELA) VALOR_RECEBIDO 
								FROM TBACORDO A INNER JOIN TBOPERADOR O on A.USUARIO_INCLUSAO = O.OPERADOR_ID
								WHERE CONT_ID <> 69								
								AND CANCEL <> 1
								AND A.DATA_INCLUSAO >=  between convert(datetime,'" + dataInicial + "') and convert(datetime,'" + datafinal + "')" +
                                @"AND O.SE_ADMI <> 1
								GROUP BY A.USUARIO_INCLUSAO,COBRADOR_ID
								ORDER BY 5 DESC";

                return _context.Connection.Query<TbAcordo>(sql).ToList();          

        }
    }
}
