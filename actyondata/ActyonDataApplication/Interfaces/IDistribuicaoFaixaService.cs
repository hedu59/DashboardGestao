using ActyonData.Domain.DataContext.Models;
using ActyonData.Domain.DataContext.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Application.Interfaces
{
    public interface IDistribuicaoFaixaService
    {
        List<DashDataPoint> ObterDistribuicaoFaixaCPF(int contratante, string dataInicial = "", string datafinal = "");
        List<DashDataPoint> ObterDistribuicaoFaixaValor(int contratante, string dataInicial = "", string datafinal = "");
        List<DashDataPoint> ObterDistribuicaoFaixaTicket(int contratante, string dataInicial = "", string datafinal = "");
        List<DashDataPoint> ObterDistribuicaoFaixaCPC(int contratante, string dataInicial = "", string datafinal = "");
        List<DashDataPoint> ObterDistribuicaoFaixaCPCA(int contratante, string dataInicial = "", string datafinal = "");
        List<DashDataPoint> ObterDistribuicaoFaixaConversao(int contratante, string dataInicial = "", string datafinal = "");
        TbDashboard ObterDetalheFaixa(int contratante, string dataInicial = "", string datafinal = "", string faixaNome="");
    }
}
