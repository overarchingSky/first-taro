const shelljs = require('shelljs')
if(process.env.allowGitCommit){
    
}else{
    shelljs.exec(`echo exit(1) && yarn commit`)
}