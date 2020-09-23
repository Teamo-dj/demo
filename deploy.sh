#! /bin/bash

SITE_PATH='/opt/unimas/demo'

echo "deploy start"
echo "----------cd project----------"
cd $SITE_PATH
echo "----------git pull----------"
git pull
echo "----------docker build----------"
docker build . -t unimas-image:latest 
echo "----------docker container create----------"
docker run -d -p 8888:80 --name unimas-container  unimas-image:latest
echo "deploy success"