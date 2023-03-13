const axios = require('axios')

const DataFileInterface = require('./DataFileInterface')

/**
 * Scrapes the HomeWizard P1 meter for watt usage
 */
class HomeWizardScraper {

    /**
     * @param {string} url - API endpoint url
     * @param {string} dataFileLocation - Directory the application should write the files to
     */
    constructor(url, dataFileLocation) {
        this.url = url
        this.dataFileInterface = new DataFileInterface(dataFileLocation)
    }

    scrape() {
        axios.get(this.url)
            .then(response => {
                // Define new data to be added to the file
                const data = {
                    timestamp: Date.now(),
                    usage: response.data.active_power_w
                }

                // Fetch the file to be written to
                const currentData = JSON.parse(this.dataFileInterface.read().toString())

                // Merge the objects if the file exists
                if (Object.keys(currentData).length) {
                    this.dataFileInterface.write(JSON.stringify([
                        ...currentData,
                        data
                    ]))
                    return
                }

                this.dataFileInterface.write(JSON.stringify([data]))
            })
            .catch(error => {
                console.log(`${(new Date).toDateString()} - ${(new Date).toLocaleTimeString()} | ${error.message}`)
            })
    }
}

module.exports = HomeWizardScraper