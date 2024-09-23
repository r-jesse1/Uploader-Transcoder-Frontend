#!/bin/bash
echo "REACT_APP_URL = \"$(aws ssm get-parameter --name /n11411911/assessment/backend-url --query 'Parameter.Value' --output text)\"" > .env
echo "REACT_APP_SOCKETURL = \"$(aws ssm get-parameter --name /n11411911/assessment/socket-url --query 'Parameter.Value' --output text)\"" >> .env