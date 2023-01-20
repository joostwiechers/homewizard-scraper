const HomeWizardScraper = require('./src/HomeWizardScraper')

const config = require('./config')

const homeWizardScraper = new HomeWizardScraper(config.url, config.dataFileLocation)

// Initial scrape
homeWizardScraper.scrape()

// Set an interval that continuously scrapes the HomeWizard
setInterval(() => {
    homeWizardScraper.scrape()
}, config.readInterval * 1000)
