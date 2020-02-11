using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Domain.DataContext.Entities
{
    public class TbAcordo
    {
        public string OPERADOR_ID { get; set; }
        public int COBRADOR_ID { get; set; }
        public string VALOR_RECEBIDO { get; set; }
        public decimal VALOR_RECEBIDO_AUX { get; set; }
        public int QUANTIDADE { get; set; }
        public string TIPO { get; set; }
        public decimal VALOR_ENTRADA { get; set; }
        public decimal VALOR_ACORDO { get; set; }
        public int QTDE_NOVA_PRESTACAO_ACORDO { get; set; }

        public TbAcordo()
        {
            this.VALOR_RECEBIDO = "0";
            this.OPERADOR_ID = "";
            this.QUANTIDADE = 0;
            this.TIPO = "NENHUM";
            this.COBRADOR_ID = 0;
            this.VALOR_ACORDO = 0;
            this.VALOR_ENTRADA = 0;
            this.QTDE_NOVA_PRESTACAO_ACORDO = 1;
        }
    }
}
