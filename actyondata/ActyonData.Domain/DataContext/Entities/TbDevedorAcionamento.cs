using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Domain.DataContext.Entities
{
    public class TbDevedorAcionamento
    {
        public long ACIONAMENTO_ID { get; set; }
        public string USUARIO_INCLUSAO { get; set; }
        public string DESCRICAO { get; set; }
        public DateTime DATA { get; set; }
        public int? COBRADOR_ID { get; set; }
        public string OPERADOR_ID { get; set; }
        public string NOME { get; set; }
        public short? CONT_ID { get; set; }
        public string ACAO_ID { get; set; }
        public int QUANTIDADE { get; set; }
        public string SE_PRODUTIVO { get; set; }
        public DateTime DATA_INCLUSAO { get; set; }

    }
}
