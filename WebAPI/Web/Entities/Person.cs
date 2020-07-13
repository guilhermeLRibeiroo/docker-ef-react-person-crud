using System;

namespace Web.Entities
{
    public class Person
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Active { get; set; }

        protected Person() { }

        public Person(string firstName, string lastName, bool active = true)
        {
            FirstName = firstName;
            LastName = lastName;
            Active = active;
        }
    }
}