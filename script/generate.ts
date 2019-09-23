#!/usr/bin/env node

//commander
//demo: https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/bin/vue.js
//githug: https://github.com/tj/commander.js

const chalk = require('chalk')
const commander = require('commander');
const program = new commander.Command();
program.version('0.0.1');
program
  .usage('<command> [options]')
program.command("init <template>")
    .description('generate component template')
    .action(temp => {
        console.log(`生成:${temp}`)
    })

// add some useful info on help
program.on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.cyan(`gen <command> --help`)} for detailed usage of given command.`)
    console.log()
  })
program.parse(process.argv)