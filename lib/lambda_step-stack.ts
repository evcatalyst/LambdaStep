import cdk = require("@aws-cdk/core");

// Importing widget_service
import widget_service = require("../lib/widget_service");

export class LambdaStepStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // Adding reference to the widget service in the constructor for the stack
    new widget_service.WidgetService(this, "Widgets");
  }
}
