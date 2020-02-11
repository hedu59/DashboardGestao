using ActyonData.Domain.DataContext.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Application.Interfaces
{
    public interface IDistribuicaoUFService
    {
        List<DashDataPoint> ObterDistribuicaoUFxCPF(int contratante, string dataini, string datafim);
        List<DashDataPoint> ObterDistribuicaoUFxTicket(int contratante, string dataini, string datafim);
        List<DashDataPoint> ObterDistribuicaoUFxValor(int contratante, string dataini, string datafim);
        List<DashDataPoint> ObterValorRegiao(int contratante, string dataini, string datafim);
        List<DashDataPoint> ObterTicketRegiao(int contratante, string dataini, string datafim);
        List<DashDataPoint> ObterConversao(int contratante, string dataini, string datafim);
     
    } 
}
