docker run \
    --name postgres \
    -e POSTGRES_USER=marcos \
    -e POSTGRES_PASSWORD="senha007" \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker logs postgres
docker exec -it postgres psql --username marcos --dbname heroes
CREATE TABLE warriors(id serial PRIMARY KEY, name varchar (255) NOT NULL);
SELECT * FROM warriors;

# mongoDB

docker run \
    --name mondodb \
    -e MONGO_INITDB_ROOT_USERNAME=marcos \
    -e MONGO_INITDB_ROOT_PASSWORD=admin \
    -p 27017:27017 \
    -d \
    mongo:4