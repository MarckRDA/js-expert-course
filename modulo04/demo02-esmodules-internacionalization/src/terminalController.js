import readLine from 'readline'
import Person from './person.js'
import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'

export default class TerminalController {
    constructor() {
        this.print = {}
        this.data = {}
    }

    initializeTerminal(database, language) {
        DraftLog(console).addLineListener(process.stdin)
        this.terminal = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        this.initializeTable(database, language)
    }

    initializeTable(database, language) {
        const data = database.map(item => new Person(item).formatted(language))
        const table = chalkTable(this.getTableOptions(), data)
        this.print = console.draft(table)
        this.data = data
    }

    closeTerminal() {
        this.terminal.close()
    }

    question(msg = '') {
        return new Promise(resolve => this.terminal.question(msg, resolve))        
    }
    
    updateTable(item) {
        this.data.push(item)
        this.print(chalkTable(this.getTableOptions(), this.data))
    }

    getTableOptions() {
        return {
            leftPad: 2,
            columns: [
                { field: 'id', name: chalk.magenta('ID') },
                { field: 'vehicles', name: chalk.cyan('Vehicles') },
                { field: 'kmTraveled', name: chalk.green('Km Traveled') },
                { field: 'from', name: chalk.yellow('From') },
                { field: 'to', name: chalk.blue('To') }
            ]
        }
    }
}