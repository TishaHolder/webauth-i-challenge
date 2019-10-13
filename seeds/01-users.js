exports.seed = function(knex) {
  
      return knex('users').insert([

        {first_name: 'john', last_name: 'doe', username: 'johndoe', password: 'test'}, //1
        {first_name: 'mary', last_name: 'jane', username: 'maryjane', password: 'test'}, //2               
        
      ]);
    //});
};