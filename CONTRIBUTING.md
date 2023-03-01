# Contributing

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

- [Contributing](#contributing)
  - [Issues](#issues)
  - [Pull Requests](#pull-requests)
    - [Prerequisites](#prerequisites)
    - [Get Started](#get-started)
    - [Creating and submitting your changes](#creating-and-submitting-your-changes)
    - [Creating good pull requests](#creating-good-pull-requests)
      - [Clear description](#clear-description)
      - [Good quality](#good-quality)
  - [Workflow](#workflow)
    - [Code review and approval process](#code-review-and-approval-process)
    - [Release process](#release-process)
  - [Your First Contribution](#your-first-contribution)
  - [Additional resources](#additional-resources)
  - [Disclaimer](#disclaimer)

## Issues

Issues are very valuable to this project.

- Ideas are a valuable source of contributions others can make
- Problems show where this project is lacking
- With a question, you show where contributors can improve the user experience

When you create a new issue, you need to choose the respective template and it'll guide you through collecting and providing the information needed.

If you find an issue that addresses the problem you're having, please add your own reproduction information to the existing issue rather than creating a new one. Adding a [reaction](https://github.blog/2016-03-10-add-reactions-to-pull-requests-issues-and-comments/) can also help indicate to our maintainers that a particular problem is affecting more than just the reporter.

## Pull Requests

PRs are always welcome and can be a quick way to get your fix or improvement slated for the next release.

### Prerequisites

To add a code contribution to our project, you will need:

0. A bug or feature that you want to work on.
1. A development machine with either Windows, Mac or Linux operating systems
2. [A Github Account](https://github.com/)
3. [Git](https://docs.github.com/en/get-started/quickstart/set-up-git#setting-up-git) installed and configured
4. Node v14 or higher installed. If you are in Mac or Linux, you can use [nvm](https://github.com/nvm-sh/nvm) or [n](https://github.com/tj/n) to help installing and managing node versions
5. [Yarn v1](https://classic.yarnpkg.com/en/docs/install#mac-stable) installed
6. An editor. [VS Code](https://code.visualstudio.com/) is a good and free editor you can use

### Get Started

First, you will need to set up the project on your machine. For that, follow these steps:

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repository to your own Github account
2. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the project to your development machine
3. Go to the folder where the project was cloned and install the dependencies by running the command `yarn install`
4. Run unit tests to make sure everything is working by running the command `yarn test`
5. If tests are successfull, follow the steps in the next section to start creating your changes

### Creating and submitting your changes

1. Create a branch locally with a succint name that is prefixed with either `fix_` for bug fixes, `feat_` for new features and `chore_` for everything else

   - Examples: `fix_fetch_orders_response`, `feat_add_bag_client`, `chore_remove_unnecessary_module`.

2. When creating the code, make sure it follows the [coding guidelines](https://github.com/Farfetch/blackout/wiki/Coding-Guidelines)
3. When you have finished coding, make sure the following checks are passing:

   - Check unit tests by runnning `yarn test`
   - Check linting errors by running `yarn lint`
   - Check type errors by runnning `yarn ci:types`

4. Commit changes to the branch by following the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) standard

   - The project is configured to lint the commit message and will raise an error if the message is not well formatted
   - The message should state its intent clearly

5. Push changes to your fork
6. Open a PR in our repository targeting the correct branch and follow the PR template so that we can efficiently review the changes

### Creating good pull requests

When opening a pull request, consider the following:

#### Clear description

You should be clear about which problem you're trying to solve with your contribution. For example:

> Add a link to code of conduct in README.md

This doesn't tell anything about why it's being done, unlike

> Add a link to code of conduct in README.md because users don't always look in the CONTRIBUTING.md

This tells the problem that you have found, and the pull request shows the action you have taken to solve it.

The same principle applies to the commit body.

#### Good quality

Make sure that the PR you are opening is of a good quality in order to be considered for merging. Here are some points you should pay attention to:

- The PR template is filled correctly
- There are no spelling mistakes in the description and code
- The code contains the adequate amount of unit tests
  - Tests should fail when your non-test code is absent
  - Tests should include reasonable permutations of the target fix/change
- No warnings are introduced by the changes when running unit tests
- It does not contain unused or commented code
- Follow the [coding guidelines](https://github.com/Farfetch/blackout/wiki/Coding-Guidelines)

## Workflow

In this project, there are always two main branches - `main` and `next`:

- `main` - stable version of packages;
- `next` - next major version of packages, containing breaking changes and every feature that exists on the stable version.

Any commit made to `main` should be replicated (and adapted) on `next`, to ensure nothing is lost between versions.
This replication should be isolated, in order to maintain a clear Git history for the release tags and commits pushed.
This means that no rebase should be made on these branches, only on PR branches; ie, `main` and `next` never actually "touch" each other (although we can cherry-pick some commits instead of actually duplicating changes).

### Code review and approval process

Our maintainers look at pull requests on a regular basis, and the process follows some simple steps:

1. PR gets a minimum of 2 approvals when reviewing
2. After being reviewed, it is tested by our internal QA team
   1. Applicable to bugfixes and features
3. After being approved, it is merged

If we request some changes to the PR after review, please add the changes in a new commit to ease reviewing. After the changes are reviewed and the PR is ready to be merged, we may ask you to squash your commits to keep git history clean.

Note that after feedback has been given we expect responses within two weeks. After two weeks we may close the pull request if it isn't showing any activity.

### Release process

Releases are made once a week in the `main` branch by our maintainers, regardless of the number of features or fixes.
It happens automatically with every commit on the `main` branch.

To prepare the next release, a new branch is created (by the maintainers), named `dev-main-<release-date>` (for example `dev-main-03-11-21` for a scheduled release on Nov 03, 2021) and every PR should target that same branch if it's to be included in that release. In a way, this mimics [GitFlow](http://datasift.github.io/gitflow/IntroducingGitFlow.html).

On the other hand, a hotfix is released as soon as it's ready and needs no intermediate branch.

## Your First Contribution

Have a look at issues that are labelled "[good first issue](https://github.com/Farfetch/blackout/labels/good%20first%20issue)".
These are meant to be a great way to get a smooth start and won’t put you in front of the most complex parts of the system.

## Additional resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)

## Disclaimer

By sending us your contributions, you are agreeing that your contribution is made subject to the terms of our [Contributor Ownership Statement](https://github.com/Farfetch/.github/blob/master/COS.md)
