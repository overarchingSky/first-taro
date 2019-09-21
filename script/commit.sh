exec < /dev/tty &&  git cz --hook || true

"prepare-commit-msg": "sudo sh ./script/commit.sh"