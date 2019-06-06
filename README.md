Node api for real time log monitoring

1. clone the code
2. server-side run 

		root@host:~/logs_grofers/log_api# node server.js
		Server running at http://127.0.0.1:3000/


3. client-side run

		root@host:~/logs_grofers/log_api# node client.js log.txt
		logs from localhost:3000
		monitor_file: monitoring log.txt
		tailing logs.. 
		23



Now, once you append some text to log.txt file

		echo "23" >> log.txt 


Input ::

		root@host:~/logs_grofers/log_api# echo 98 >> log.txt
		root@host:~/logs_grofers/log_api# echo fossil_fuel >> log.txt
		root@host:~/logs_grofers/log_api# echo elements >> log.txt


Output on client side ::


		root@pwned:~/logs_grofers/log_api# node client.js log.txt
		logs from localhost:3000
		monitor_file: monitoring log.txt
		tailing logs.. 
		23

		tailing logs.. 98

		tailing logs.. fossil_fuel

		tailing logs.. elements


