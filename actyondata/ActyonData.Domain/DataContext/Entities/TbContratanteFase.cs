using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Domain.DataContext.Entities
{
    public class TbContratanteFase
    {
        public int FaixaInicial { get; set; }
        public int FaixaFinal { get; set; }
        public int Intervalo { get; set; }
        public string NomeFaixa { get; set; }
    }
}
