using FluentValidator;
using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Domain.DataContext.Entities
{
    public class TbOperador: Notifiable 
    {
        public string OPERADOR_ID { get; set; }
        public string SENHA_WEB { get; set; }
        //public bool SE_ADMI { get; set; }

        public TbOperador(string id, string Password)
        {
            this.OPERADOR_ID = id;
            this.SENHA_WEB = Password;
            
            if (OPERADOR_ID == null)
            {
                AddNotification("Login", "Login não encontrado");
            }
            else
            {
                AddNotification("Login", "Login encontrado");
            }
        }

        public override string ToString()
        {
            return OPERADOR_ID.ToString();
        }
    }

}
