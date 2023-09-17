import chalk from 'chalk';
import { createServer } from 'http';

const hostname = 'localhost';
const port = 3000;

const log = console.log;
chalk.level = 1; // Use colours in the VS Code Debug Window

const server = createServer((req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World from App 2');
});

server.listen(port, hostname, () => {
    log(chalk.green('Connection established! Sending statistics'));
    log(chalk.red('Not all statistics are available...'));
    log(chalk.redBright('Endpoint disconnected before all results were received'));
    log(chalk.magenta('All finished'));
    log(chalk.blue(`Server running at http://${hostname}:${port}/`));
});