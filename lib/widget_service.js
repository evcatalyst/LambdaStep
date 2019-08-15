"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@aws-cdk/core");
const apigateway = require("@aws-cdk/aws-apigateway");
const lambda = require("@aws-cdk/aws-lambda");
const s3 = require("@aws-cdk/aws-s3");
class WidgetService extends core.Construct {
    constructor(scope, id) {
        super(scope, id);
        // Define the WidgetStore repository as an S3 Bucket
        const bucket = new s3.Bucket(this, "WidgetStore");
        // Establish the function definition
        const handler = new lambda.Function(this, "widgetHandler", {
            runtime: lambda.Runtime.NODEJS_8_10,
            code: lambda.Code.asset("resources"),
            handler: "widgets.main",
            environment: {
                BUCKET: bucket.bucketName
            }
        });
        // Grant permissions to read/write the WidgetStore bucket by the handler Function
        bucket.grantReadWrite(handler);
        // Define the API Gateway service and integrate it to the Lambda function with a GET method
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
exports.WidgetService = WidgetService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0X3NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aWRnZXRfc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1QztBQUN2QyxzREFBdUQ7QUFDdkQsOENBQStDO0FBQy9DLHNDQUF1QztBQUV2QyxNQUFhLGFBQWMsU0FBUSxJQUFJLENBQUMsU0FBUztJQUMvQyxZQUFZLEtBQXFCLEVBQUUsRUFBVTtRQUMzQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLG9EQUFvRDtRQUNwRCxNQUFNLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRWxELG9DQUFvQztRQUNwQyxNQUFNLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN6RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDcEMsT0FBTyxFQUFFLGNBQWM7WUFDdkIsV0FBVyxFQUFFO2dCQUNYLE1BQU0sRUFBRSxNQUFNLENBQUMsVUFBVTthQUMxQjtTQUNGLENBQUMsQ0FBQztRQUVILGlGQUFpRjtRQUNqRixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRS9CLDJGQUEyRjtRQUMzRixNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUN0RCxXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLFdBQVcsRUFBRSw4QkFBOEI7U0FDNUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7WUFDdEUsZ0JBQWdCLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSx5QkFBeUIsRUFBRTtTQUNwRSxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDLFFBQVE7SUFDNUQsQ0FBQztDQUNGO0FBaENELHNDQWdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb3JlID0gcmVxdWlyZShcIkBhd3MtY2RrL2NvcmVcIik7XG5pbXBvcnQgYXBpZ2F0ZXdheSA9IHJlcXVpcmUoXCJAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheVwiKTtcbmltcG9ydCBsYW1iZGEgPSByZXF1aXJlKFwiQGF3cy1jZGsvYXdzLWxhbWJkYVwiKTtcbmltcG9ydCBzMyA9IHJlcXVpcmUoXCJAYXdzLWNkay9hd3MtczNcIik7XG5cbmV4cG9ydCBjbGFzcyBXaWRnZXRTZXJ2aWNlIGV4dGVuZHMgY29yZS5Db25zdHJ1Y3Qge1xuICBjb25zdHJ1Y3RvcihzY29wZTogY29yZS5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgLy8gRGVmaW5lIHRoZSBXaWRnZXRTdG9yZSByZXBvc2l0b3J5IGFzIGFuIFMzIEJ1Y2tldFxuICAgIGNvbnN0IGJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgXCJXaWRnZXRTdG9yZVwiKTtcblxuICAgIC8vIEVzdGFibGlzaCB0aGUgZnVuY3Rpb24gZGVmaW5pdGlvblxuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwid2lkZ2V0SGFuZGxlclwiLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfOF8xMCwgLy8gU28gd2UgY2FuIHVzZSBhc3luYyBpbiB3aWRnZXQuanNcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmFzc2V0KFwicmVzb3VyY2VzXCIpLFxuICAgICAgaGFuZGxlcjogXCJ3aWRnZXRzLm1haW5cIixcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIEJVQ0tFVDogYnVja2V0LmJ1Y2tldE5hbWVcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEdyYW50IHBlcm1pc3Npb25zIHRvIHJlYWQvd3JpdGUgdGhlIFdpZGdldFN0b3JlIGJ1Y2tldCBieSB0aGUgaGFuZGxlciBGdW5jdGlvblxuICAgIGJ1Y2tldC5ncmFudFJlYWRXcml0ZShoYW5kbGVyKTtcblxuICAgIC8vIERlZmluZSB0aGUgQVBJIEdhdGV3YXkgc2VydmljZSBhbmQgaW50ZWdyYXRlIGl0IHRvIHRoZSBMYW1iZGEgZnVuY3Rpb24gd2l0aCBhIEdFVCBtZXRob2RcbiAgICBjb25zdCBhcGkgPSBuZXcgYXBpZ2F0ZXdheS5SZXN0QXBpKHRoaXMsIFwid2lkZ2V0cy1hcGlcIiwge1xuICAgICAgcmVzdEFwaU5hbWU6IFwiV2lkZ2V0IFNlcnZpY2VcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcInRoaXMgc2VydmljZSBzZXJ2ZXMgd2lkZ2V0cy5cIlxuICAgIH0pO1xuXG4gICAgY29uc3QgZ2V0V2lkZ2V0c0ludGVncmF0aW9uID0gbmV3IGFwaWdhdGV3YXkuTGFtYmRhSW50ZWdyYXRpb24oaGFuZGxlciwge1xuICAgICAgcmVxdWVzdFRlbXBsYXRlczogeyBcImFwcGxpY2F0aW9uL2pzb25cIjogJ3sgXCJzdGF0dXNDb2RlXCI6IFwiMjAwXCIgfScgfVxuICAgIH0pO1xuXG4gICAgYXBpLnJvb3QuYWRkTWV0aG9kKFwiR0VUXCIsIGdldFdpZGdldHNJbnRlZ3JhdGlvbik7IC8vIEdFVCAvXG4gIH1cbn1cbiJdfQ==