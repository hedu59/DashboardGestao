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
    public class ContratanteRepository:IContratanteRepository
    {
        private readonly ActyonDataContext _actyonContext;


        public ContratanteRepository(ActyonDataContext actyonContext)
        {
            _actyonContext = actyonContext;
        }

        public List<TbContratante> ObterContratantes()
        {
            var strConsulta = @"SET LANGUAGE us_english
                                    SELECT CONTRATANTE_ID, FANTASIA FROM TBCONTRATANTE WHERE SE_ATIV = 'S' ORDER BY FANTASIA";

            var result = _actyonContext.Connection.Query<TbContratante>(strConsulta).ToList();

            return result;
        }

        public List<TbContratanteFase> ObterFasesContratante(int contId)
        {
            var strConsulta = @" SET LANGUAGE us_english SELECT * FROM TBCONTRATANTE_FASE WHERE CONT_ID =" + 16;

            var result = _actyonContext.Connection.Query<TbContratanteFase>(strConsulta).ToList();

            return result;
        }
    }
}
