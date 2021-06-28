import AWS from "aws-sdk";
AWS.config.region = process.env.REACT_APP_AWS_REGION;

const dynamoDB = new AWS.DynamoDB({
  apiVersion: "2012-08-10",
  sslEnabled: false,
  paramValidation: false,
  convertResponseTypes: false,
});

export const addQuestionnaireForAnotherUser = async (tableName) => {
  const params = {
    TableName: tableName,
    Item: {
      id: {
        S: "OtherUserID123",
      },
      UserId: {
        S: "1234567890",
      },
      content: {
        S: "Some content belonging to another user",
      },
    },
  };
  return dynamoDB.putItem(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2),
        params
      );
    }
  });
};

export const addQuestionForAnotherUser = async (tableName) => {
  const params = {
    TableName: tableName,
    Item: {
      id: {
        S: "OtherUserID123",
      },
      UserId: {
        S: "1234567890",
      },
      question: {
        S: "Some question belonging to another user",
      },
    },
  };
  return dynamoDB.putItem(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    }
  });
};

export const clearDatabase = async () => {
  await clearTable(
    `${process.env.REACT_APP_PROJECT_NAME}-${process.env.REACT_APP_ENV}-questionnaires-table`
  );
  await clearTable(
    `${process.env.REACT_APP_PROJECT_NAME}-${process.env.REACT_APP_ENV}-questions-table`
  );
};

export const clearTable = async (tableName) => {
  console.log(`Clearing the ${tableName} table`);
  const params = {
    TableName: tableName,
  };
  const items = await dynamoDB.scan(params).promise();
  await items.Items.forEach(async (item) => {
    const deleteParams = {
      TableName: tableName,
      ConsistentRead: true,
      Key: {
        id: item.id,
        UserId: item.UserId,
      },
    };
    await dynamoDB.deleteItem(deleteParams, function (err, data) {
      if (err) {
        console.error(
          "Unable to delete item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      }
    });
  });
};
