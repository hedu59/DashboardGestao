
using ActyonData.Shared;
using System;
using System.Data;
using System.Data.SqlClient;

namespace ActyonData.Infra.DataContext.Context
{
    public class ActyonDataContext : IDisposable
    {
        public SqlConnection Connection { get; set; }
        public ActyonDataContext()
        {
            Connection = new SqlConnection(Settings.ConnectionString);
            Connection.Open();
        }

        public void Dispose()
        {
            if (Connection.State != ConnectionState.Closed)
                Connection.Close();
        }

    }
}
