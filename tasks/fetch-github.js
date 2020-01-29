const axios = require('axios')

const { setAsync } = require('../configs/redis')
const baseUrl = require('../configs/index')
const jobsFilter = require('../utils/jobs-filter')

async function fetchGithub() {
  
  const allJobs = []
  let result = 1, page = 0

  while(result > 0) {
    const jobs = await axios.get(`${baseUrl}?page=${page}`)
    result = jobs.data.length
    page++
    allJobs.push(...jobs.data)
  }

  const filteredJobs = allJobs.filter(jobsFilter)
  const success = await setAsync('github', JSON.stringify(filteredJobs))
}

module.exports = fetchGithub