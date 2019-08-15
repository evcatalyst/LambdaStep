import core = require("@aws-cdk/core");
import apigateway = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");
import s3 = require("@aws-cdk/aws-s3");

export class WidgetService extends core.Construct {
  constructor(scope: core.Construct, id: string) {
    super(scope, id);

    // Define the WidgetStore repository as an S3 Bucket
    const bucket = new s3.Bucket(this, "WidgetStore");

    // Establish the function definition
    const handler = new lambda.Function(this, "widgetHandler", {
      runtime: lambda.Runtime.NODEJS_8_10, // So we can use async in widget.js
      code: lambda.Code.asset("resources"),
      handler: "widgets.main",
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    // Grant permissions to read/write the WidgetStore bucket by the handler Function
    bucket.grantReadWrite(handler);

    // Define the API Gateway service
    const api = new apigateway.RestApi(this, "widgets-api", {
      restApiName: "Widget Service",
      description: "this service serves widgets."
    });

    const getWidgetsIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("GET", getWidgetsIntegration); // GET /
  }
}
