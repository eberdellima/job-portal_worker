const CronJob = require('cron').CronJob

const fetchGithub = require('./tasks/fetch-github')

//  fetch github jobs
new CronJob('*/2 * * * *', fetchGithub, null, true)