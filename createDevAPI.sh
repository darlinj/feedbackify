#!/bin/bash
S3_BUCKET_NAME="pipeline-artifacts-bannana"
SITE_URL=${REACT_SITE_URL}
if aws s3 ls "s3://$S3_BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'
then
  aws s3 mb s3://${S3_BUCKET_NAME}
fi

aws cloudformation package --template-file "api/infra/rootStack.yml" --s3-bucket "${S3_BUCKET_NAME}" --s3-prefix "packagedCloudformationAssetsDEV/" --output-template-file "deploy/packagedTemplate.yml"

aws cloudformation deploy --template-file deploy/packagedTemplate.yml --stack-name ${REACT_APP_PROJECT_NAME}-dev --parameter-overrides ProjectName=${REACT_APP_PROJECT_NAME} Environment=dev SiteURL=${SITE_URL} --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND

aws cloudformation describe-stacks --stack-name ${REACT_APP_PROJECT_NAME}-dev --query 'Stacks[0].Outputs[][OutputKey,OutputValue]'