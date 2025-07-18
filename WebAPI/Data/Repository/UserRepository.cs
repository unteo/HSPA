﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext dc;

        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public async Task<User> Authenticate(string userName, string passwordText)
        {
            var user = await dc.Users.FirstOrDefaultAsync(x => x.Username == userName);

            if (user == null || user.PasswordKey == null)
            {
                return null;
            }
            if (!MachPasswordHash(passwordText, user.Password, user.PasswordKey))
            {
                return null;
            }

            return user;
        }

        private bool MachPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))
            {
                
                var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordText));
             for (int i = 0; i < passwordHash.Length; i++)
            {
                if (passwordHash[i] != password[i])
                    return false;
            }
             return true;
            }           
        }

        public void Register(string userName, string password)
        {
            byte[] passwordHash, passwordKey;

            using ( var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

            User user = new User(); 
            user.Username = userName;
            user.Password = passwordHash;
            user.PasswordKey = passwordKey;

            dc.Users.Add(user); 
        }

        public async Task<bool> UserAlreadyExists(string userName)
        {
            return await dc.Users.AnyAsync(ECKeyXmlFormat => ECKeyXmlFormat.Username == userName);
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await dc.Users.ToListAsync();
        }
    }
}
    