using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using API.ActionFilters;
using AutoMapper;
using Common.Config;
using Domain;
using Domain.Entities.Users;
using Domain.IServices;
using Domain.RequestModels;
using Domain.RequestModels.User;
using Domain.Services;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace API {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            var mappingConfig = new MapperConfiguration (cfg =>
                cfg.AddMaps (new [] {
                    "Domain",
                }));
            IMapper mapper = mappingConfig.CreateMapper ();
            services.AddSingleton (mapper);

            // Adding CORS
            services.AddCors (options => options.AddPolicy ("AllowAnyOrigin", builder => {
                builder.AllowAnyOrigin ()
                    .AllowAnyMethod ()
                    .AllowAnyHeader ();
            }));

            services.AddControllers (options => options.Filters.Add (new HttpResponseExceptionFilter ()))
                .AddFluentValidation (fv =>
                    fv.RegisterValidatorsFromAssembly (Assembly.GetAssembly (typeof (UserRegisterRequest))));

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen (c => {
                c.SwaggerDoc ("v1", new OpenApiInfo { Title = "Eventing API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,

                        },
                        new List<string>()
                    }
                });
                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine (AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments (xmlPath);
            });

            services.AddDbContext<EventingContext> (options => {
                options.UseNpgsql (Environment.GetEnvironmentVariable ("CONNECTION_STRING"));
            });

            services.AddIdentity<ApplicationUser, ApplicationRole> (options => {
                    options.SignIn.RequireConfirmedAccount = true;
                    options.Password.RequireNonAlphanumeric = false;
                })
                .AddEntityFrameworkStores<EventingContext> ();

            // configure jwt token options
            var key = Encoding.ASCII.GetBytes (Environment.GetEnvironmentVariable("JWT_SECRET"));

            services.AddAuthentication (options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer (options => {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuer = true,
                    ValidateAudience = false,
                    ValidIssuer = Environment.GetEnvironmentVariable("ISSUER"),
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey (key),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddTransient<IAuthenticationService, AuthenticationService>();
            services.AddTransient<IUsersService, UsersService>();
            services.AddTransient<IEventsService, EventsService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseStaticFiles ();
            app.UseSwagger ();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI (c => {
                c.SwaggerEndpoint ("/swagger/v1/swagger.json", "My API V1");
                c.RoutePrefix = string.Empty;
            });

            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            }

            // app.UseHttpsRedirection();
            
            app.UseCors ("AllowAnyOrigin");
            app.UseRouting ();

            app.UseAuthentication ();
            app.UseAuthorization ();
            
            app.UseEndpoints (endpoints => { endpoints.MapControllers (); });
        }
    }
}