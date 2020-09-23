#! /bin/bash
echo "deploy start"
echo "----------cd project----------"
cd "/opt/unimas/demo"
echo "----------git pull----------"
git pull
echo "----------docker build----------"
docker build . -t unimas-image:latest 
echo "----------docker container delete----------"
docker ps -a -f unimas-container | xargs -r docker stop | xargs -r docker rm
echo "----------docker container create----------"
docker run -d -p 8888:80 --name unimas-container  unimas-image:latest
echo "deploy success"



