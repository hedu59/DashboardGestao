using ActyonData.Domain.DataContext.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Domain.DataContext.Repository
{
    public interface ICarteiraRepository
    {
        List<CarteiraAtiva> ObterCarteiraAtivas(string dataInicial, string dataFinal, int contId);

        List<CarteiraAtiva> ObterCarteiraUnique(string dataInicial, string dataFinal, int contId);

        List<CarteiraAtiva> ObterCarteiraDetalhe(string dataInicial, string dataFinal, int contId);

        int ObterCarteiraAtiva(int contId);
    }
}
