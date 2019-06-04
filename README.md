Node api for real time log monitoring

1. create a sample log.txt file
2. clone the run and run npm install
3. clone the code and run 

		node logs.js

4. start the handler

		node handler.js log.txt 


Now, once you append some text to log.txt file

		echo "grofers" >> log.txt 


node process will tail the log file on cli, which can be forwarded to browser If we want!


Input ::

		root@host:~/logs_grofers/log_api# echo "grofers" >> log.txt
		root@host:~/logs_grofers/log_api# echo "test_real_time" >> log.txt


Output ::


		root@host:~/logs_grofers/log_api# node handler.js log.txt
		sending logs to localhost:8000
		monitor_file: monitoring log.txt
		stdout: grofers

		stdout: grofers

		stdout: test_real_time




