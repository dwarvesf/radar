We even hosted a Radio Talk on this, where our QC Lead explained how the team utilizes Testlink to enhance and finetune our test report with better visuals and functions.

## What is Testlink
We use Testlink to store requirements, test cases, test execution, export report, metric, chart for the release version. Previously, we manage them in Excel. Since its format didn’t meet our needs, we moved forward to Testlink because its outstanding support is report format.

## How it works
Testlink starts its work from the requirement. Testers can break these requirements into test cases. With each user story, testers can define how many test cases it needs to cover the requirement. Based on the test cases list, the team decided to use manual tests or automation tests for each case.

## How to setup
At Dwarves, we are self-hosting our Testlink server (pretty similar to our Gitlab). So when we bootstrap a new project, there is no extra step require besides QC team will need to set up a workspace in Testlink (same with group/repositories in our Gitlab)

![](https://i.imgur.com/sk4hTPv.png)

## Benefit stage
Testing

## What’s next
We currently trial Testlink with BaseHQ and Aharooms. Using Testlink, we get to know the quality status of the project or how many percentage requirements are covered. The plan is to configure and sync automation test reports with TestLink (besides executing test cases by human resources, we also keep the tracking result by daily automation tests).