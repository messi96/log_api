Node api for real time log monitoring

1. Clone the code
2. Server-side (172.17.0.2) run 
	
	server is one of my docker container with ip 172.17.0.2 that is reachable from my client machine (192.168.0.102)

		root@server:~/logs_grofers/log_api# docker run -it node /bin/bash
		root@server:/# uname -a 
		Linux d77fbee280bd 4.18.0-kali2-amd64 #1 SMP Debian 4.18.10-2kali1 (2018-10-09) x86_64 GNU/Linux

	we have our server.js file & log.txt (or any log file on the server side)

		root@d77fbee280bd:~# ls -l
		total 8
		-rw-r--r-- 1 root root    4 Jun  7 00:33 log.txt
		-rw-r--r-- 1 root root 1083 Jun  7 00:10 server.js

	let's start our client server to listen for logs

		root@host:~/logs_grofers/log_api# node logs.js
		Client Server listening at http://0.0.0.0:3000/			(this is 192.168.0.102)

	server side : 

		root@d77fbee280bd:~# node server.js log.txt 192.168.0.102 3000
		logs from 192.168.0.102:3000
		monitor_file: monitoring log.txt
		tailing logs.. 123

	client side : 
		
		root@host:~/logs_grofers/log_api# node logs.js
		Client Server listening at http://0.0.0.0:3000/
		Tailing logs : 123

	Now, let's get inside our server and change the log.txt file
	
	Server side : 

		root@host:~# docker exec -it d77fbee280bd /bin/bash				(execing into running container where our server.js is running)
		root@d77fbee280bd:~# echo "owned" >> log.txt

		root@d77fbee280bd:~# node server.js log.txt 192.168.0.102 3000
		logs from 192.168.0.102:3000
		monitor_file: monitoring log.txt
		tailing logs.. 123

		tailing logs.. owned


	Client side : 
		
		root@host:~/logs_grofers/log_api# node logs.js
		Client Server listening at http://0.0.0.0:3000/
		Tailing logs : 123

		Tailing logs : owned

       Server side : 
	
        	monitor_file: monitoring log.txt
		tailing logs.. 123

		tailing logs.. owned

		tailing logs.. testing_server_side

       Client side : 

		root@host:~/logs_grofers/log_api# node logs.js
		Client Server listening at http://0.0.0.0:3000/
		Tailing logs : 123

		Tailing logs : owned

		Tailing logs : testing_server_side



appending log file :

		root@d77fbee280bd:~# echo owned >> log.txt
		root@d77fbee280bd:~# echo testing_server_side >> log.txt
		root@d77fbee280bd:~# echo my_server_service_logs >> log.txt
		root@d77fbee280bd:~# echo one_plus >> log.txt


server-side console output :

		root@d77fbee280bd:~# node server.js log.txt 192.168.0.102 3000
		logs from 192.168.0.102:3000
		monitor_file: monitoring log.txt
		tailing logs.. 123
		owned
		testing_server_side
		my_server_service_logs

		tailing logs.. one_plus


client-side result : 

		root@host:~/logs_grofers/log_api# node logs.js
		Client Server listening at http://0.0.0.0:3000/
		Tailing logs : 123
		owned
		testing_server_side
		my_server_service_logs

		Tailing logs : one_plus



