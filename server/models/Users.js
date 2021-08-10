const Sequelize = require('sequelize');

const db = new Sequelize('postgresauth', 'postgres', 'kekego459', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = db.define('user',{
  name:{
    type: Sequelize.STRING
  },
  email:{
    type: Sequelize.STRING
  },
  password:{
    type: Sequelize.STRING
  },
})


module.exports = User;