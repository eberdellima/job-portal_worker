const axios = require('axios')

const baseUrl = 'https://jobs.github.com/positions.json'

async function fetchGithub() {

  const allJobs = []
  let result = 1, page = 0

  while (result > 0) {
    const jobs = await axios.get(`${baseUrl}?page=${page}`)
    allJobs.push(...jobs.data)
    result = jobs.data.length
    page++
    console.log(jobs.data.length)
  }

  console.log("Nr jobs: ", allJobs.length)
}

fetchGithub()

module.exports = fetchGithub