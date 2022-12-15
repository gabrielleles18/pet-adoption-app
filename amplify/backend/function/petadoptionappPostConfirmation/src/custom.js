const aws = require('aws-sdk');
const ddb = new aws.DynamoDB();

const tableName = process.env.USERTABLE;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
    // event event.request.userAttributes.sub. (sub, email)
    // insert code to be executed by your lambda trigger

    if (!event?.request?.userAttributes?.sub) {
        console.log("No sub provider");

        return;
    }

    const now = new Date();
    const timestamp = now.getTime();

    const userItem = {
        __typename: {S: 'User'},
        _lastChangedAt: {N: timestamp.toString()},
        _version: {N: '1'},
        createdAt: {S: now.toISOString()},
        updatedAt: {S: now.toISOString()},
        id: {S: event.request.userAttributes.sub},
        userName: {S: event.userName},
        phone: {S: event.request.userAttributes.phone_number},
        email: {S: event.request.userAttributes.email},
    }

    const params = {
        Item: userItem,
        TableName: tableName
    };

    // save a new user to DynamoDB
    try {
        await ddb.putItem(params).promise();
        console.log("success");
    } catch (e) {
        console.log(e);
    }
};

