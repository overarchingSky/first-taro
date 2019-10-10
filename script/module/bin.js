#!/usr/bin/env node
const moduleCtrl = require("./index")
const chalk = require('chalk')
const commander = require('commander');
const program = new commander.Command();
program.version('0.0.1');
program
  .usage('<command> <options>')
program.command("add <moduleName>")
  .description('add a new module')
  .action(async moduleName => {
      moduleCtrl.create(moduleName)
  })
program.command("list")
  .description('list all modules')
  .action(async moduleName => {
      moduleCtrl.list(moduleName)
  })
program.command("remove <moduleName>")
  .description('remove a module')
  .action(async moduleName => {
      moduleCtrl.remove(moduleName)
  })
// add some useful info on help
program.on('--help', () => {
    console.log(`  Run ${chalk.cyan(`module <command> --help`)} for detailed usage of given command.`)
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