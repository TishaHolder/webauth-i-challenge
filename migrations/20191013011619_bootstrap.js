
exports.up = function(knex) {

        return knex.schema
        .createTable('users', tbl => {

            //primary key
            tbl.increments();

            tbl.string('first_name', 255)
            .notNullable();

            tbl.string('last_name', 255)
            .notNullable();

            tbl.string('username', 255)
            .unique()
            .notNullable();

            tbl.string('password', 255)
            .notNullable();

        });  
  
};

exports.down = function(knex) {

    return knex.schema
    .dropTableIfExists('users');   
  
  
};
