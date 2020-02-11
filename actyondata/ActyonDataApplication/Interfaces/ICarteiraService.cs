using ActyonData.Domain.DataContext.Entities;
using ActyonData.Domain.DataContext.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Application.Interfaces
{
    public interface ICarteiraService
    {
        
        List<DashDataPoint> ObterCarteiraAtivas(string dataInicial, string dataFinal, int contId);
        List<DashDataPoint> ObterCarteiraAtivasUnique(string dataInicial, string dataFinal, int contId);
        CarteiraAtiva ObterDetalheCarteira(string dataInicial, string dataFinal, int contId);
        List<DashDataPoint> ObterEsforcoAtiva(int contratante, string dataInicial, string dataFinal);
        List<DashDataPoint> ObterEsforcoUnique(int contratante, string dataInicial, string dataFinal);
        List<FunilAtendimento> ObterFunilAtendimento(int contratante, string dataInicial, string dataFinal);
    }
}
