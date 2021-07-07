#!/bin/bash
S3_BUCKET_NAME="reflectify-development-build-artifacts"
if aws s3 ls "s3://$S3_BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'
then
  aws s3 mb s3://${S3_BUCKET_NAME}
fi

aws cloudformation package --template-file "api/infra/frontend.yml" --s3-bucket "${S3_BUCKET_NAME}" --s3-prefix "packagedCloudformationAssetsDEVFrontend/" --output-template-file "deploy/packagedTemplate.yml"

aws cloudformation deploy \
--template-file deploy/packagedTemplate.yml \
--stack-name ${REACT_APP_PROJECT_NAME}-dev-frontend \
--parameter-overrides ProjectName=${REACT_APP_PROJECT_NAME} Environment=dev SiteURL=${REACT_APP_SITE_URL} UserPoolId=${REACT_APP_CLIENT_ID} UserPoolClientId=${REACT_APP_USER_POOL_ID} GraphQLApiEndpoint=${REACT_APP_API_ENDPOINT} ApiKey=${REACT_APP_API_KEY} \
--capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND 

aws cloudformation describe-stacks --stack-name ${REACT_APP_PROJECT_NAME}-dev-frontend --query 'Stacks[0].Outputs[][OutputKey,OutputValue]'



