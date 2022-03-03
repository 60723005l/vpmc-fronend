'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CONTAINERID: '"vpmc"',
  BASE_API_URL:'"http://140.122.82.98/api/"',
  BASE_BACKEND_URL:'"https://localhost:44367/"',
  HOST:'"0.0.0.0"'
})
