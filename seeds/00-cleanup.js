//import knex cleaner
const cleaner = require('knex-cleaner');

//This will remove all tables (excluding the two tables that track migrations) 
//in the correct order before any seed files run.
exports.seed = function(knex) {
  return cleaner.clean(knex, {
    mode: 'truncate', // resets ids
    // don't empty migration tables
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'], 
  });
};
