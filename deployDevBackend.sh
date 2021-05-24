#!/bin/bash
S3_BUCKET_NAME="pipeline-artifacts-bannana"
SITE_URL=${REACT_SITE_URL}
if aws s3 ls "s3://$S3_BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'
then
  aws s3 mb s3://${S3_BUCKET_NAME}
fi

aws cloudformation package --template-file "api/infra/deploy.yml" --s3-bucket "${S3_BUCKET_NAME}" --s3-prefix "packagedCloudformationAssetsDEV/" --output-template-file "deploy/packagedTemplate.yml"

aws cloudformation deploy --template-file deploy/packagedTemplate.yml --stack-name ${REACT_APP_PROJECT_NAME}-dev-backend --parameter-overrides ProjectName=${REACT_APP_PROJECT_NAME} Environment=dev SiteURL=${SITE_URL} --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND

ENV_VARS=`aws cloudformation describe-stacks --stack-name ${REACT_APP_PROJECT_NAME}-dev-backend | jq '.["Stacks"][0]["Outputs"][] | {(.["OutputKey"]|tostring): .["OutputValue"]}' | jq -s add `

echo ${ENV_VARS}

export REACT_APP_API_KEY=$(echo ${ENV_VARS} | jq --raw-output ".[\"GraphQLApiKey\"]")
export REACT_APP_API_ENDPOINT=$(echo ${ENV_VARS} | jq --raw-output ".[\"GraphQLApiEndpoint\"]")
export REACT_APP_USER_POOL_ID=$(echo ${ENV_VARS} | jq --raw-output ".[\"CognitoUserPoolId\"]")
export REACT_APP_CLIENT_ID=$(echo ${ENV_VARS} | jq --raw-output ".[\"CognitoUserPoolClientId\"]")
