if(process.env.allowGitCommit){
    
}else{
    shelljs(`exit(1) && yarn commit`)
}