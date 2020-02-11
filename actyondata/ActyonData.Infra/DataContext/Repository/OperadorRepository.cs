using ActyonData.Domain.DataContext.Repository;
using ActyonData.Infra.DataContext.Context;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ActyonData.Infra.DataContext.Repository
{
    public class OperadorRepository: IOperadorRepository
    {
        private readonly ActyonDataContext _actyonContext;
        public OperadorRepository(ActyonDataContext context)
        {
            _actyonContext = context;
        }

        public bool ValidaUsuario(string operadorId, string senha)
        {
            string strConsulta = @" SET LANGUAGE us_english select count(*) from tboperador where operador_id = '" + operadorId+"' and senha_web = '"+senha+"' and SE_ADMI = 1 and SE_ATIVO='S'";
            var result = _actyonContext.Connection.Query<int>(strConsulta).FirstOrDefault();

            if (result >= 1)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

    }
}
