#!/usr/bin/bash

echo "[$(date)] oil deploy" >> /home/ubuntu/deploy.log
sudo cp /home/ubuntu/deploy/* /home/ubuntu/oilstation
pm2 reload oil