#!/bin/bash

npm run build
ls -la ./build/*
ls -la 
echo "deploying to s3://${ORIGIN_BUCKETNAME}"
aws s3 sync --cache-control 'max-age=604800' --exclude index.html build/ s3://${ORIGIN_BUCKETNAME} 
aws s3 sync --cache-control 'no-cache' build/ s3://${ORIGIN_BUCKETNAME} 
