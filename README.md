Using log.io node package

docker build -t log_api .

For local host :

		docker run -p 28778:28778 log_api


For Remote hosts :

		docker run -p 28778:28778 -e server_host=127.0.0.1 log_api