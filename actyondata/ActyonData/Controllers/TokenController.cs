using ActyonData.Domain.DataContext.Entities;
using ActyonData.Domain.DataContext.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ActyonCobWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]
    public class TokenController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IOperadorRepository _repository;

        public TokenController(IConfiguration configuration, IOperadorRepository repository)
        {
            _configuration = configuration;
            _repository = repository;
        }

        [AllowAnonymous]
        [HttpPost]

        public IActionResult RequestToken([FromBody] TbOperador request)
        {
            var operadorId = request.OPERADOR_ID;
            var senha = request.SENHA_WEB;

            var validar = _repository.ValidaUsuario(operadorId, senha);


            if (validar == true)
            {

                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, request.OPERADOR_ID)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SecurityKey"]));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken
                (

                    issuer: "jcasolucoes",
                    audience: "jcasolucoes",
                    claims: claims,
                    expires: DateTime.Now.AddDays(30),
                    signingCredentials: creds

                );

                var tokenResult = new { token = new JwtSecurityTokenHandler().WriteToken(token), operadorId = request.OPERADOR_ID};


                return Ok(tokenResult);

            }

            return BadRequest("Credenciais inválidas...");
        }
    }
}