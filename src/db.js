const pgp = require('pg-promise')();
const connectionString = 'postgres://web2projekt1_5v8l_user:3aIbACMYYimYwmJkF1sbOI5Xt7z1EgeF@dpg-ckvbgrbamefc73evvssg-a.frankfurt-postgres.render.com/web2projekt1_5v8l';
const db = pgp(connectionString);

module.exports = db;
