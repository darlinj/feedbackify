const awsConfig = {
  aws_project_region: "eu-west-1",
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_APIEndpoint,
  aws_appsync_region: "eu-west-1",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_appsync_apiKey: "da2-vycxnsauwfbv7mvphozug2cyku",
  aws_cognito_region: "eu-west-1",
  aws_user_pools_id: process.env.REACT_APP_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_CLIENT_ID,
  authenticationFlowType: "USER_PASSWORD_AUTH",
};

export default awsConfig;
