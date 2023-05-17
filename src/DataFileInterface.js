const fs = require('fs')
const dayjs = require('dayjs')
const weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)

/**
 * Interface that handles reading/writing the data files.
 */
class DataFileInterface {

    /**
     * DataFileInterface constructor.
     *
     * @param {string} dataFolder - The folder the files should be written to.
     */
    constructor(dataFolder) {
        this.dataFolder = dataFolder
    }

    /**
     * Writes a file with given content.
     *
     * @param {string} data - Data to be written to the data file.
     */
    write(data) {
        fs.writeFileSync(this.getFilePath(), data)
    }

    /**
     * Create folder/file when it does not exist.
     */
    create() {
        if (!fs.existsSync(this.dataFolder)) {
            fs.mkdir(this.dataFolder, error => {
                if (error) {
                    process.exit()
                }
            })

            fs.writeFileSync(this.getFilePath(), JSON.stringify({}))
        }

        fs.writeFileSync(this.getFilePath(), JSON.stringify({}))
    }

    /**
     * Reads and returns file contents of current week.
     *
     * @returns {Buffer}
     */
    read() {
        if (!fs.existsSync(this.dataFolder) || !fs.existsSync(this.getFilePath())) {
            this.create()
        }

        return fs.readFileSync(this.getFilePath())
    }

    /**
     * File path that will be used to read/write.
     *
     * @returns {string} filePath
     */
    getFilePath() {
        const weekOfYear = dayjs().week() < 10
            ? '0' + dayjs().week()
            : dayjs().week()
        return `${this.dataFolder}${weekOfYear}-${dayjs().year()}.json`
    }
}

module.exports = DataFileInterface
