using ActyonData.Domain.DataContext.Entities;
using ActyonData.Domain.DataContext.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Domain.DataContext.Repository
{
    public interface IDistribuicaoUFRepository
    {
        List<TbDashboard> ObterQuantidadeUFCPF(int ContId, string DataIni, string DataFim);

        List<TbDashboard> ObterValorPorUF(int ContId, string DataIni, string DataFim);

        List<TbDashboard> ObterTicketMedio(int ContId, string DataIni, string DataFim);

        List<TbDashboard> ObterConversao(int ContId, string DataIni, string DataFim);

        List<TbDashboard> ObterValorRegiao(int contratante, string dataini, string datafim);

        List<TbDashboard> ObterTicketRegiao(int contratante, string dataini, string datafim);
    }
}
