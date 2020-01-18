const CronJob = require('cron').CronJob

const fetchGithub = require('./tasks/fetch-github')

new CronJob('*/2 * * * *', fetchGithub, null, true)