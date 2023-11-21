#!/bin/bash

sleep 1
CONTAINER_ID=$(docker ps -q -f name=database-mysql)

docker cp ./nhahang.sql $CONTAINER_ID:/nhahang.sql
docker exec -it $CONTAINER_ID mysql -uroot -p12345 nhahang < /nhahang.sql
docker exec -it $CONTAINER_ID mysql -u root -p12345 -e "SET GLOBAL sql_mode='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION';"
docker exec -it $CONTAINER_ID mysql -u root -p12345 -e "SET SESSION sql_mode='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION';"