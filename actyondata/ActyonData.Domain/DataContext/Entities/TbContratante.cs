using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Domain.DataContext.Entities
{
    public class TbContratante
    {
        public int CONTRATANTE_ID { get; set; }
        public string FANTASIA { get; set; }
        public bool SE_ATIVO { get; set; }
        public string VALOR_RECEBIDO_MES { get; set; }
    }
}
