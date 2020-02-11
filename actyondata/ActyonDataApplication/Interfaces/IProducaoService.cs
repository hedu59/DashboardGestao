using System;
using System.Collections.Generic;
using System.Text;
using ActyonData.Domain.DataContext.Models;

namespace ActyonData.Application.Interfaces
{
    public interface IProducaoService
    {
        List<DashDataPoint> ObterPagamentosContratantes(string dataInicial, string datafinal );

        List<DashDataPoint> ObterAcordosPorContratantes(string dataInicial, string datafinal);

        String ObterSomaPagamentos(string dataInicial, string datafinal);
    }
}
