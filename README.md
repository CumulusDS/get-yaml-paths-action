# Package Template

This is a basic template for Cumulus library packages.

You can use the template by cloning the template project from https://github.com/CumulusDS/package-template and unpacking into a new directory. Remember to update package.json, appveyor.yml and this documentation with the name and purpose of your new project. Create a new repo on GitHub for the new project. Connect your local repo to the new GitHub repo by changing the origin:

1. Use the [package-template](https://github.com/CumulusDS/package-template) to create a GitHub repo for the new package.
2. Configure standard secrets with the GitHub repo https://github.com/CumulusDS/REPOSITORY/settings/secrets
    - `SLACK_WEBHOOK`
    - `NODE_AUTH_TOKEN`
3. Clone the new repo.
    ```bash
    git clone https://github.com/CumulusDS/sts-sites.git
    ```
4. Create the first feature branch in your local repo.
5. Replace `PackageTemplate` and `Package Template` throughout the repo. Edit this file, `package.json` and `appveyor.yml` with the new service name.
6. Push the feature branch. GitHub Actions should automatically build it.
7. Change `"private": true"` in package.json; the "private" flag prevents publishing the package.
7. Open the first pull request.

# Domain Distillation

Please define your core domain here.

# Development

- [Package Structure](doc/development.md#package-structure)
- [Development Environment](doc/development.md#development-environment)
- [Quality](doc/development.md#quality)
- [Release](doc/development.md#release)

## License

This package is not licensed.
