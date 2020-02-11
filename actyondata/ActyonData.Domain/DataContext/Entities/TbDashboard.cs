using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Domain.DataContext.Entities
{
    public class TbDashboard
    {
        public int SEQU_ID { get; set; }
        public DateTime DATA_INSERT { get; set; }
        public long ACIONAMENTO_ID { get; set; }
        public DateTime DATA { get; set; }
        public long DEVEDOR_ID { get; set; }
        public long CONT_ID { get; set; }
        public string CPF { get; set; }
        public string UF { get; set; }
        public int FAIXA { get; set; }
        public decimal VALOR { get; set; }
        public string AGENTE_ID { get; set; }
        public string OCORRENCIA_ID { get; set; }
        public int CPC { get; set; }
        public int CPCA { get; set; }
        public int ALO { get; set; }
        public string CARTEIRA { get; set; }


        //auxiliares 

        public int QUANTIDADE { get; set; }
        public decimal VALOR_TICKET { get; set; }

        public string FASE { get; set; }
    }
}
