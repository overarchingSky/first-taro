const shelljs = require('shelljs')
if(process.env.allowGitCommit){
    
}else{
    shelljs.exec(`yarn commit`) 
    return
}
if(!process.env.noVerifyHook){
    shelljs.exec(`exec < /dev/tty &&  git cz --hook || true`)
}