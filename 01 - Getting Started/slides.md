# Getting Started

---
# Why serverless?
 - Focus on business logic, not servers
 - Less administration
 - Pay per use
 - Auto-scaling
 - Quicker development of a whole system

---
# Why Serverless Framework?
 - Cloud agnostic (maybe)
 - Infrastructure as code
 - Removes a lot of boilerplate from tools like CloudFormation
 - Solves provider problems. (S3 Triggered Lambdas)
 - OSS (docs, support)
 - Removes the need of maintaining our own tooling
 - Pluggable. If it doesn't work how you want, make a plugin

Read more at https://serverless.com/

---
# Creating and Deploying a service
 - `serverless create --template aws-nodejs`
 -  Change the `region` to `eu-west-2` and `service` in serverless.yml
 - `serverless deploy --stage=<YOUR_NAME> `

---
# Functions
- Where do we split?
- Events (http, s3, kinesis, cloudwatch rules, azure timers, service bus)
- Extra resources

---
# Multiple Events
```yaml
functions:
  hello:
    handler: handler.hello
	events:
		- http:
        method: put
        path: /hello
		- http:
      method: get
      path: /hello
```
---

# Enhancements
## How we can make this more production ready.

---
# Tests
Serverless apps are just apps with an event, there's no special techniques for testing.
 - Unit tests
 - Acceptance (Write before you implement)
 - Integration

---

# Bundling
Language specific:

 - We can use webpack to bundle our code
 - Babel to transpile
 - Package individually for leaner functions within the whole microservice

---
# Telemetry
 - Track everything
 - We should know why a service goes down before it happens
 - INFO, WARN, ERROR, FATAL metrics


---
# Dev, Prod Parity
- External non-containerised prod environment can be difficult
- Consistent development environment with docker (DynamoDB local, postgres)

