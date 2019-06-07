# Contributing

When contributing to this repository, please follow the pull request process.

## Pull Request Process

1. Make sure of your develop branch are updated.
```sh
$ git checkout develop
$ git pull origin develop
```
2. Create a new branch with feature, bugfix or hotfix prefix from the develop branch.
```sh
$ git checkout -b feature/yourBranchName
```
3. Create unit tests for the changes made. All the tests must be indentifier as a test, example: `example.test.js`.
4. Update the CHANGELOG.md with details of changes, in the section "Ongoing Changes".
5. Create a merge request at the repo between your branch and the develop branch. Check the option to delete your source branch when merged. Assign of the maintainers to review the changes.
