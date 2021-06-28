#!/bin/bash
PROJECT_NAME="feedbackify"

aws cloudformation deploy --template-file ./pipeline/pipeline.yml --stack-name ${PROJECT_NAME}PipelineStack --parameter-overrides ProjectName=${PROJECT_NAME} --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND
