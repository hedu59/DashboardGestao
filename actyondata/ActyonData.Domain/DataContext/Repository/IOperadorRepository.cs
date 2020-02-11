using System;
using System.Collections.Generic;
using System.Text;

namespace ActyonData.Domain.DataContext.Repository
{
    public interface IOperadorRepository
    {
        bool ValidaUsuario(string operadorId, string senha);

    }
}
