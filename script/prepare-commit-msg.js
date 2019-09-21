const shelljs = require('shelljs')
const exit = require('exit')
if(process.env.allowGitCommit){
    
}else{
    console.log('+++','try exit')
    shelljs.exec(`yarn commit`)
    exit(1)
    
    return
}
if(!process.env.noVerifyHook){ 
    shelljs.exec(`exec < /dev/tty &&  git cz --hook || true`)
}