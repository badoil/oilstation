#!/usr/bin/bash

echo "[$(date)] oil deploy" >> /home/ubuntu/deploy.log
sudo cp -rf /home/ubuntu/deploy/* /home/ubuntu/oilstation
sudo cp -f /home/ubuntu/.env /home/ubuntu/oilstation

sudo pm2 reload oil