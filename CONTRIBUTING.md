# Contributing

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

- [Contributing](#contributing)
  - [Issues](#issues)
  - [Pull Requests](#pull-requests)
    - [Does it state intent](#does-it-state-intent)
    - [Is it of good quality](#is-it-of-good-quality)
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

In general, we follow the ["fork-and-pull" Git workflow](https://github.com/susam/gitpr)

1. Fork the repository to your own Github account
2. Clone the project to your machine
3. Create a branch locally with a succinct but descriptive name
4. Commit changes to the branch
5. Follow any guidelines specific to this repo
6. Push changes to your fork
7. Open a PR in our repository and follow the PR template so that we can efficiently review the changes.

When opening a pull request, consider the following:

### Does it state intent

You should be clear about which problem you're trying to solve with your contribution. For example:

> Add a link to code of conduct in README.md

This doesn't tell anything about why it's being done, unlike

> Add a link to code of conduct in README.md because users don't always look in the CONTRIBUTING.md

This tells the problem that you have found, and the pull request shows the action you have taken to solve it.

The same principle applies to the commit body.

### Is it of good quality

- It follows the provided template
- There are no spelling mistakes
- It follows the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) specification

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

Note that after feedback has been given we expect responses within two weeks. After two weeks we may close the pull request if it isn't showing any activity.

### Release process

Releases are made once a week in the `main` branch by our maintainers, regardless of the number of features or fixes.
It happens automatically with every commit on the `main` branch.

To prepare the next release, a new branch is created (by the maintainers), named `dev-main-<release-date>` (for example `dev-main-03-11-21` for a scheduled release on Nov 03, 2021) and every PR should target that same branch if it's to be included in that release. In a way, this mimics [GitFlow](http://datasift.github.io/gitflow/IntroducingGitFlow.html).

On the other hand, a hotfix is released as soon as it's ready and needs no intermediate branch.

## Your First Contribution

If you want to deep dive and help out with development, then first get the project installed locally.
After that is done we suggest you have a look at issues that are labelled "[good first issue](https://github.com/Farfetch/blackout/labels/good%20first%20issue)".
These are meant to be a great way to get a smooth start and won’t put you in front of the most complex parts of the system.

## Additional resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)

## Disclaimer

By sending us your contributions, you are agreeing that your contribution is made subject to the terms of our [Contributor Ownership Statement](https://github.com/Farfetch/.github/blob/master/COS.md)
