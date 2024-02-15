#start the web preview
run:
	cd ./group6 && npm run build


#add all then show status
add:
	git add -A
	git status

# pull from remote gitlab
pull:
	git pull
	git status

