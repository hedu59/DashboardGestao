using ActyonData.Application.Interfaces;
using ActyonData.Application.Services;
using ActyonData.Domain.DataContext.Repository;
using ActyonData.Infra.DataContext.Context;
using ActyonData.Infra.DataContext.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace ActyonData
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            #region CORS

            services.AddCors(x => x.AddPolicy("MyPolicy", build =>
                  build.AllowAnyHeader()
                       .AllowCredentials()
                       .AllowAnyMethod()
                       .AllowAnyOrigin()));


            #endregion

            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json");

            Configuration = builder.Build();


            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            #region Token
            // Ativa o uso do token como forma de autorizar o acesso
            // a recursos deste projeto
            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser().Build());
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {

                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "jcasolucoes",
                    ValidAudience = "jcasolucoes",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["SecurityKey"]))
                };


                options.Events = new JwtBearerEvents

                {
                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine("Token Inválido...:" + context.Exception.Message.ToString());
                        return Task.CompletedTask;
                    },

                    OnTokenValidated = context =>
                    {
                        Console.WriteLine("Token válido...:" + context.SecurityToken);
                        return Task.CompletedTask;
                    }

                };


            });
            #endregion

            #region Dependency Injection

            services.AddScoped<ActyonDataContext, ActyonDataContext>();
            services.AddTransient<IDistribuicaoFaixaService, DistribuicaoFaixaService>();
            services.AddTransient<IDistribuicaoUFService, DistribuicaoUFService>();
            services.AddTransient<ICarteiraService, CarteiraService>();
            services.AddTransient<IProducaoService, ProducaoService>();

            services.AddTransient<IContratanteRepository, ContratanteRepository>();
            services.AddTransient<IDistribuicaoUFRepository, DistribuicaoUFRepository>();
            services.AddTransient<IDistribuicaoFaixaRepository, DistribuicaoFaixaRepository>();
            services.AddTransient<ICarteiraRepository, CarteiraRepository>();
            services.AddTransient<IOperadorRepository, OperadorRepository>();
            services.AddTransient<IProducaoRespository, ProducaoRepository>();

            #endregion

            services.AddMvc().AddJsonOptions(options => { options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver(); });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddResponseCompression();
           
            //services.AddSwaggerGen(x => {
            //    x.SwaggerDoc("v1", new Info { Title = "GestaoWebCob", Version = "v1" });
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors("MyPolicy");
            app.UseAuthentication();
            app.UseResponseCompression();
            app.UseMvc();
            //app.UseHttpsRedirection();
        }
    }
}
