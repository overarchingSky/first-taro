const shelljs = require('shelljs')
console.log('verifyHook:',process.env.verifyHook)
if(!process.env.noVerifyHook){
    shelljs.exec(`exec < /dev/tty &&  git cz --hook || true`)
}