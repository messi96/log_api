Using log.io node package
Log.io is a log management tool that monitors the system and provides real-time information of the logs. It is a simple and effective application built on top of Node.js and Socket.io.

		docker build -t log_api .

For local host :

		docker run -p 28778:28778 log_api


For Remote hosts :

		docker run -p 28778:28778 -e server_host=127.0.0.1 log_api
