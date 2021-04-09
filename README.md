## To create a local development API do the following:

To set your AWS credentials run:

> source setEnv

To create a development backend run:

> source ./createDevBackend.sh

create a test user called pinky@example.com

> ./api/tests/createCognitoUser.sh

run

> npm test

run

> npm start

If everything passes then you are good
