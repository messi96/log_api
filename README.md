Node api for real time log monitoring

1. Clone the code
2. Server-side (172.17.0.2) run 
	
	server is one of my docker container with ip 172.17.0.2 that is reachable from my client machine (192.168.0.102)

		root@host:~/logs_grofers/log_api# docker run -it node /bin/bash
		root@d77fbee280bd:/# uname -a 
		Linux d77fbee280bd 4.18.0-kali2-amd64 #1 SMP Debian 4.18.10-2kali1 (2018-10-09) x86_64 GNU/Linux

	we have our server.js file & log.txt (or any log file on the server side)

		root@d77fbee280bd:~# ls -l
		total 8
		-rw-r--r-- 1 root root    4 Jun  7 00:33 log.txt
		-rw-r--r-- 1 root root 1083 Jun  7 00:10 server.js

	let's start our client server to listen for logs

		root@host:~/logs_grofers/log_api# node logs.js
		Client Server listening at http://0.0.0.0:3000/			(this is 192.168.0.102)

	Server side : 

		root@d77fbee280bd:~# node server.js log.txt 192.168.0.102 3000
		sending logs to 192.168.0.102:3000
		monitor_file: monitoring log.txt
		tailing logs.. 123

	Client side : 
		
		root@host:~/logs_grofers/log_api# node logs.js
		Client Server listening at http://0.0.0.0:3000/
		Tailing logs : 123

	Now, let's get inside our server and change the log.txt file
	
	Server side : 

		root@host:~# docker exec -it d77fbee280bd /bin/bash				(execing into running container where our server.js is running)
		root@d77fbee280bd:~# echo "owned" >> log.txt

		root@d77fbee280bd:~# node server.js log.txt 192.168.0.102 3000
		sending logs to 192.168.0.102:3000
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
		sending logs to 192.168.0.102:3000
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



If Running on same machine.. just use -->  node server.js log.txt 

reading /var/log/dpkg.log file

server-side
	
	spawned up a new container for testing.. and got our server.js/handler.js file on it. 

		root@abe22242a2b3:~# cat /var/log/dpkg.log ^C
		root@abe22242a2b3:~# ls -al /var/log/dpkg.log
		-rw-r--r-- 1 root root 191687 May  8 01:41 /var/log/dpkg.log
		root@abe22242a2b3:~# ls -l
		total 4
		-rw-r--r-- 1 root root 1089 Jun  7 01:15 handler.js
		root@abe22242a2b3:~# node handler.js /var/log/dpkg.log 192.168.0.102 3000
		sending logs to 192.168.0.102:3000
		monitor_file: monitoring /var/log/dpkg.log


client-side result : 

		root@host:~/logs_grofers/log_api# node logs.js 
		Client Server listening at http://0.0.0.0:3000/
		Tailing logs : 2019-05-08 01:41:50 configure libmagickwand-dev:all 8:6.9.7.4+dfsg-11+deb9u7 <none>
		2019-05-08 01:41:50 status unpacked libmagickwand-dev:all 8:6.9.7.4+dfsg-11+deb9u7
		2019-05-08 01:41:50 status half-configured libmagickwand-dev:all 8:6.9.7.4+dfsg-11+deb9u7
		2019-05-08 01:41:50 status installed libmagickwand-dev:all 8:6.9.7.4+dfsg-11+deb9u7
		2019-05-08 01:41:50 trigproc libc-bin:amd64 2.24-11+deb9u4 <none>
		2019-05-08 01:41:50 status half-configured libc-bin:amd64 2.24-11+deb9u4
		2019-05-08 01:41:50 status installed libc-bin:amd64 2.24-11+deb9u4
		2019-05-08 01:41:50 trigproc libgdk-pixbuf2.0-0:amd64 2.36.5-2+deb9u2 <none>
		2019-05-08 01:41:50 status half-configured libgdk-pixbuf2.0-0:amd64 2.36.5-2+deb9u2
		2019-05-08 01:41:50 status installed libgdk-pixbuf2.0-0:amd64 2.36.5-2+deb9u2

real-time tailing of logs!
