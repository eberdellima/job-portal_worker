const axios = require('axios')
const redis = require('redis')

const client = redis.createClient()
const { promisify } = require('util')
// const getASync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)

const baseUrl = require('../configs/index')
const jobsFilter = require('../utils/jobs-filter')

async function fetchGithub() {
  
  const allJobs = []
  let result = 1, page = 0

  //  fetch all pages
  while(result > 0) {
    const jobs = await axios.get(`${baseUrl}?page=${page}`)
    result = jobs.data.length
    page++
    allJobs.push(...jobs.data)
  }

  //  filter algorithm
  const filteredJobs = allJobs.filter(jobsFilter)

  //  set in redis
  const success = await setAsync('github', JSON.stringify(filteredJobs))
  // console.log({success})
}

module.exports = fetchGithub