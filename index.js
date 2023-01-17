const axios = require('axios')
const DataFileAdapter = require('./src/DataFileAdapter')

const url = 'http://192.168.178.59/api/v1/data'

const dataFileAdapter = new DataFileAdapter()

setInterval(() => {
    axios.get(url)
        .then(response => {
            const currentData = JSON.parse(dataFileAdapter.read().toString())
            let data = {
                timestamp: Date.now(),
                usage: response.data.active_power_w
            }

            if (Object.keys(currentData).length) {
                dataFileAdapter.write(JSON.stringify([
                    ...currentData,
                    data
                ]))
                return
            }

            dataFileAdapter.write(JSON.stringify([data]))
        })
}, 10 * 1000)
