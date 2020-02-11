using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Domain.DataContext.Models
{
    public class DistribuicaoPorFaixa
    {
        public string IntervaloFaixa { get; set; }
        public int QuantidadeCPF { get; set; }
        public decimal Valor { get; set; }
        public decimal TicketMedio { get; set; }
        public int QuantidadeCPC { get; set; }
        public int QuantidadeAcordo { get; set; }
        public double TaxaConversao { get; set; }
    }
}
