FROM centos

ENV server_host
RUN yum install -y http://fedora.mirrors.telekom.ro/pub/epel/7/x86_64/Packages/e/epel-release-7-11.noarch.rpm  && yum -y update && yum install -y make gcc* && yum install -y firewalld

RUN curl --silent --location https://rpm.nodesource.com/setup_5.x | bash -
RUN yum install -y nodejs

RUN npm install -g log.io --user "root"

WORKDIR /root/.log.io/

RUN cd /root/.log.io/
#.conf files can be retrieved from vault-server to make it dynamic with server_host value
 
#RUN firewall-cmd --add-port=28778/tcp --permanent && firewall-cmd --reload

EXPOSE 28778

CMD ["log.io-server &","log.io-harvester"]
