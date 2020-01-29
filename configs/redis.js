const redis = require('redis')

const client = redis.createClient()
const { promisify } = require('util')
// const getASync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)

module.exports = {
  setAsync
}