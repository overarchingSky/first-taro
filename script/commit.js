const shelljs = require('shelljs')
if(process.env.allowGitCommit){
    
}else{
    shelljs.exec(`yarn commit`)
}

return 'exit 1'