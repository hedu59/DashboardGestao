using ActyonData.Domain.DataContext.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Domain.DataContext.Repository
{
    public interface IContratanteRepository
    {
        List<TbContratante> ObterContratantes();
        List<TbContratanteFase> ObterFasesContratante(int contId);
    }
}
