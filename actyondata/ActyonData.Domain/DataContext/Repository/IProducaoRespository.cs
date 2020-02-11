using ActyonData.Domain.DataContext.Entities;
using ActyonData.Domain.DataContext.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Domain.DataContext.Repository
{
    public interface IProducaoRespository
    {
        List<TbTituloPago> ObterPagamentosContratantes(string dataInicial ="" , string datafinal="" );

        List<TbAcordo> ObterValoresAcordosOperadorCarteiraTribanco(string dataInicial = "", string datafinal = "");

        List<TbAcordo> ObterValoresAcordosOperadorCarteira(string dataInicial = "", string datafinal = "");
    }
}
