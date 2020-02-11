using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Domain.DataContext.Models
{
    public class CarteiraAtiva
    {
        //-----RETORNO EM QUANTIDADE
        public string CPF { get; set; }
        public int QUANTIDADE_CPF { get; set; }
        public int QuantidadeDiscagem { get; set; }
        public int ALO { get; set; }
        public int CPC { get; set; }
        public int CPCA { get; set; }


        //-----RETORNO EM PERCENTUAL
        public double? ALO_UNIQUE { get; set; }
        public double? CPC_UNIQUE { get; set; }
        public double? CPCA_UNIQUE { get; set; }
        public int DISCAGEM_UNIQUE { get; set; }


        //-----RETORNO EM PERCENTUAL
        public double? ALO_ATIVO { get; set; }
        public double? CPC_ATIVO { get; set; }
        public double? CPCA_ATIVO { get; set; }
        public int DISCAGEM_ATIVA { get; set; }


        public double SPIN { get; set; } // ------- (Discagem/Carteira [Total de CPF]) 
        public int Esforco { get; set; } // ------ (Discagem/CPF) 

        public double? ALO_ATIVO_ESFORCO { get; set; }
        public double? CPC_ATIVO_ESFORCO { get; set; }
        public double? CPCA_ATIVO_ESFORCO { get; set; }
 
        public double? ALO_UNIQUE_ESFORCO { get; set; }
        public double? CPC_UNIQUE_ESFORCO { get; set; }
        public double? CPCA_UNIQUE_ESFORCO { get; set; }

    }
}
