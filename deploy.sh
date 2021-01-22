#!/usr/bin/bash

echo "[$(date)] oil deploy" >> /home/ubuntu/deploy.log
sudo cp -rf /home/ubuntu/deploy/* /home/ubuntu/oilstation
sudo cp -f /home/ubuntu/.env /home/ubuntu/oilstation
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000

cd /home/ubuntu/oilstation
sudo pm2 start --name oil npm -- run start:prod