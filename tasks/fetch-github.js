const axios = require('axios')
const redis = require('redis')

const client = redis.createClient()
const { promisify } = require('util')
// const getASync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)

const baseUrl = 'https://jobs.github.com/positions.json'

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

  console.log('All job:', allJobs.length)

  //  filter algorithm
  const filteredJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase()

    //  algo logic
    if(
      jobTitle.includes('senior') ||
      jobTitle.includes('manager') ||
      jobTitle.includes('sr.') ||
      jobTitle.includes('architect')
    ) {
      return false
    } else {
      return true
    }

  })

  console.log('Filtered job:', filteredJobs.length)

  //  set in redis
  const success = await setAsync('github', JSON.stringify(filteredJobs))
  console.log({success})
}

module.exports = fetchGithub