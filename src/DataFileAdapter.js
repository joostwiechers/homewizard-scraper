const fs = require('fs')

class DataFileAdapter {
    constructor() {
        this.src = 'data/readings.json'
    }

    write(data) {
        return fs.writeFileSync(this.src, data)
    }

    create() {
        return fs.writeFileSync(this.src, JSON.stringify({}))
    }

    read() {
        if (!fs.existsSync(this.src)) {
            this.create()
        }

        return fs.readFileSync(this.src)
    }
}

module.exports = DataFileAdapter