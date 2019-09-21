const shelljs = require('shelljs')
if(process.env.allowGitCommit){
    
}else{
    console.log('+++','try exit')
    shelljs.exec(`exit 1 | cross-env allowGitCommit=true git commit -m ''`) 
    return
}
if(!process.env.noVerifyHook){
    shelljs.exec(`exec < /dev/tty &&  git cz --hook || true`)
}