function jobFilter(job) {
  const jobTitle = job.title.toLowerCase()

    if(
      jobTitle.includes('senior') ||
      jobTitle.includes('manager') ||
      jobTitle.includes('sr.') ||
      jobTitle.includes('architect')
    ) {
      return false
    }
    
    return true
}

module.exports = jobFilter