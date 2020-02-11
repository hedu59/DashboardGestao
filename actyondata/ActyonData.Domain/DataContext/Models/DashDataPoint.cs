using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace ActyonData.Domain.DataContext.Models
{
    [DataContract]
    public class DashDataPoint
    {
        [DataMember(Name = "label")]
        public string Label = null;

        [DataMember(Name = "y")]
        public Nullable<double> Y = null;

        [DataMember(Name = "x")]
        public Nullable<double> X = null;

        [DataMember(Name = "z")]
        public Nullable<double> Z = null;

        [DataMember(Name = "W")]
        public string W = null;

        [DataMember(Name = "label2")]
        public string Label2 = null;


        public DashDataPoint(double y, string label)
        {
            this.Y = y;
            this.Label = label;
        }



        public DashDataPoint(double x, double y, string label)
        {
            this.X = x;
            this.Y = y;
            this.Label = label;
        }

        public DashDataPoint(double x, double y)
        {
            this.X = x;
            this.Y = y;
        }

        public DashDataPoint(double x, double y, string label, string w)
        {
            this.X = x;
            this.Y = y;
            this.Label = label;
            this.W = w;
        }

        public DashDataPoint(double y, string label, string w)
        {
            this.Y = y;
            this.Label = label;
            this.W = w;
        }


        public DashDataPoint(string label, string w)
        {
            this.Label = label;
            this.W = w;
        }
        public DashDataPoint(double x, double y, double z)
        {
            this.X = x;
            this.Y = y;
            this.Z = z;
        }

        public DashDataPoint(double x, double y, double z, string label)
        {
            this.X = x;
            this.Y = y;
            this.Z = z;
            this.Label = label;
        }
    }
}