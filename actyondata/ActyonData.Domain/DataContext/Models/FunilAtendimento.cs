using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Domain.DataContext.Models
{
    public class FunilAtendimento
    {
        public string FAIXA_NOME { get; set; }
        public int FAIXA_INICIAL { get; set; }
        public int FAIXA_FAIXA { get; set; }
        public int CPF { get; set; }
        public int NAO_DISCADO { get; set; }
        public int TENTATIVA { get; set; }
        public int TENTATIVA_UNIQUE { get; set; }
        public int ALO { get; set; }
        public int ALO_UNIQUE { get; set; }
        public int CPC {get;set;}
        public int CPC_UNIQUE { get; set; }
        public int ACORDO_UNIQUE { get; set; }
        public decimal CONVERSAO { get; set; }
        public decimal ESFORCO { get; set; }
        public decimal TRAB_CARTEIRA { get; set; }
        public decimal HIT_HAT_ALO { get; set; }
        public decimal HIT_HAT_CPC { get; set; }
    }
}
