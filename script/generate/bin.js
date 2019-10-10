#!/usr/bin/env node

//commander
//demo: https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/bin/vue.js
//githug: https://github.com/tj/commander.js

const chalk = require('chalk')
const createTemp = require('./create')
const commander = require('commander');
const program = new commander.Command();
program.version('0.0.1');
program
  .usage('<command> <options>')
program.command("init [template]")
    .description('generate component template')
    .action(async temp => {
        createTemp(temp)
    })
// add some useful info on help
program.on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.cyan(`gen <command> --help`)} for detailed usage of given command.`)
    console.log()
  })
// error on unknown commands
program.on('command:*', function () {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});
const argv = program.parse(process.argv).args
if(argv.length === 0){
    program.outputHelp()
}