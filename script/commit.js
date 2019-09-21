const shelljs = require('shelljs')
if(!process.env.noVerifyHook){
    shelljs.exec(`exec < /dev/tty &&  git cz --hook || true`)
}