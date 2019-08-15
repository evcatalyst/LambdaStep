#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { LambdaStepStack } from '../lib/lambda_step-stack';

const app = new cdk.App();
new LambdaStepStack(app, 'LambdaStepStack');
