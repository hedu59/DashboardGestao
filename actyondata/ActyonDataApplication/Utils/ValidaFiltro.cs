using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Application.Utils
{
    public class ValidaFiltro
    {
        public class filtros
        {
            public string dataIni { get; set; }
            public string dataFim { get; set; }
        }

        public filtros ValidaFiltrosData(string dtinicial, string dtfinal)
        {
            var valida = new filtros();

            if (dtinicial == "" || dtinicial == null)
            {
                valida.dataIni = String.Format("{0:dd-MM-yyyy}", DateTime.Today);
            }
            else
            {
                valida.dataIni = String.Format("{0:dd-MM-yyyy}", dtinicial);
            }
               
            if (dtfinal == "" || dtfinal == null)
            {
                valida.dataFim = String.Format("{0:dd-MM-yyyy}", DateTime.Today);
            }
            else
            {
                valida.dataFim = String.Format("{0:dd-MM-yyyy}", dtfinal);
            }

            return valida;
        }

        


    }
}
