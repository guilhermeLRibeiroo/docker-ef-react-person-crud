using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using Web.Entities;

namespace Web.Context
{
    public class EntityFrameworkContext
        : DbContext
    {
        public EntityFrameworkContext([NotNull] DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected EntityFrameworkContext() { }

        public DbSet<Person> People { get; set; }
    }
}