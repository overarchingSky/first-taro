const shelljs = require('shelljs')
if(process.env.allowGitCommit){
    
}else{
    shelljs.exec(`exec exit(1);`) 
    return
}
if(!process.env.noVerifyHook){
    shelljs.exec(`exec < /dev/tty &&  git cz --hook || true`)
}