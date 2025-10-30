const knex = require('knex')
const knexfile = require('../../knexfile')
const env = process.env.NODE_ENV || 'development'
const connections = knex(knexfile[env])

module.exports = connections;