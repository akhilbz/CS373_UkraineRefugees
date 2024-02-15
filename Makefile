#start the web preview
run:
	cd ./group6 && npm run build


# get git log
PhaseOne.log.txt:
	git log > PhaseOne.log.txt


#add all then show status
add:
	git add -A
	git status

# pull from remote gitlab
pull:
	git pull
	git status

