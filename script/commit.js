const shelljs = require('shelljs')
if(process.env.allowGitCommit){
    
}else{
    shelljs.exec(`git exit 1 && yarn commit`)
}