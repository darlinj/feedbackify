#!/bin/bash

if [[ -z "${REACT_APP_TEST_USERNAME}" ]]; then
  USERNAME=${1}
else
  USERNAME=${REACT_APP_TEST_USERNAME}
fi
if [[ -z "${REACT_APP_TEST_USER_PASSWORD}" ]]; then
  PASSWORD=${2}
else
  PASSWORD=${REACT_APP_TEST_USER_PASSWORD}
fi
if [[ -z "${REACT_APP_TEST_USERNAME}" ]]; then
  PROFILE="--profile admin"
else
  PROFILE=""
fi
if [[ -z "${REACT_APP_CLIENT_ID}" ]]; then
  echo "FAIL: Cognito CLIENT_ID needs to be set"
fi
if [[ -z "${REACT_APP_USER_POOL_ID}" ]]; then
  echo "FAIL: Cognito USER_POOL_ID needs to be set"
fi

aws cognito-idp sign-up --username ${USERNAME} --password ${PASSWORD} --client-id ${REACT_APP_CLIENT_ID} --user-attributes Name=phone_number,Value="+441473123456" ${PROFILE}

aws cognito-idp admin-set-user-password --user-pool-id ${REACT_APP_USER_POOL_ID} --username ${USERNAME} --password ${PASSWORD} --permanent ${PROFILE}
