#!/bin/bash
S3_BUCKET_NAME="pipeline-artifacts-bannana"
PROJECT_NAME="feedbackify"

aws cloudformation package --template-file "./pipeline/pipeline.yml" --s3-bucket "${S3_BUCKET_NAME}" --s3-prefix "packagedPipeline/" --output-template-file "./deploy/packagedPipeline.yml"

aws cloudformation deploy --template-file ./deploy/packagedPipeline.yml --stack-name ${PROJECT_NAME}PipelineStack --parameter-overrides ProjectName=${PROJECT_NAME} --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND
