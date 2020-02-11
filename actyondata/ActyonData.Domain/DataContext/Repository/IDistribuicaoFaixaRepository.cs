using ActyonData.Domain.DataContext.Entities;
using ActyonData.Domain.DataContext.Models;
using System.Collections.Generic;

namespace ActyonData.Domain.DataContext.Repository
{
    public interface IDistribuicaoFaixaRepository
    {
        List<TbDashboard> ObterDistribuicaoFaixaCPF(int contratante, string dataInicial = "", string datafinal = "");
        List<TbDashboard> ObterDistribuicaoFaixaValor(int contratante, string dataInicial = "", string datafinal = "");
        List<TbDashboard> ObterDistribuicaoFaixaTicket(int contratante, string dataInicial = "", string datafinal = "");
        List<TbDashboard> ObterDistribuicaoFaixaCPC(int contratante, string dataInicial = "", string datafinal = "");
        List<TbDashboard> ObterDistribuicaoFaixaCPCA(int contratante, string dataInicial = "", string datafinal = "");
        List<TbDashboard> ObterDistribuicaoFaixaConversao(int contratante, string dataInicial = "", string datafinal = "");
        List<TbDashboard> ObterDetalheFaixa(int contratante, string dataInicial = "", string datafinal = "", string faixaIni = "", string faixaFim = "");
    }
}
