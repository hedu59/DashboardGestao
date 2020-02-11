using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Domain.DataContext.Entities
{
    public class TbTituloPago
    {
        public string FANTASIA { get; set; }
        public string OPERADOR_ID { get; set; }
        public string VALOR_RECEBIDO { get; set; }
        public double VALOR_RECEBIDO_DOUBLE { get; set; }
        public string VALOR_TOTAL_RECEBIDO { get; set; }
        public string PRIMEIRA_PARCELA { get; set; }
        public int TIPO_TITULO_ID { get; set; }


        public TbTituloPago()
        {
            this.VALOR_RECEBIDO_DOUBLE = 0;
            this.FANTASIA = "";
            this.OPERADOR_ID = "";
            this.VALOR_RECEBIDO = "";
            this.VALOR_TOTAL_RECEBIDO = "";
            this.PRIMEIRA_PARCELA = "";
            this.TIPO_TITULO_ID = 0;
        }
    }
}
