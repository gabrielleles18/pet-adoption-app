export type AmplifyDependentResourcesAttributes = {
    "api": {
        "petadoptionapp": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "auth": {
        "petadoptionapp": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "storage": {
        "s3petadoptionappstorage174f90ad": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "petadoptionappPostConfirmation": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string",
            "LambdaExecutionRoleArn": "string"
        }
    }
}