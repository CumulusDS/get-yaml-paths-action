# Get YAML Paths

This action reads a YAML file and outputs selected properties.

The action uses lodash.get to access properties at the provided paths. The `file` input is the only required input. All other inputs are mapped into equally named outputs with the value at the given paths.

## Inputs

### `file`

**Required** The name of the file to load.

### `name: path`

Give each path to look-up as a `name: path` input pair.

## Outputs

The Action generates an output for `name` with the value at the corresponding `path`. Output names are all lowercase, due to limitations in GitHub Actions.

## Example usage

Given an input file `file.yml`:
```yml
foo:
  bar: baz
provider:
  stage: green
```

A step definition like this:
```
uses: @cumulusds@v0.0.0
with:
  file: file.yml
  bar: foo.bar
  providerStage: provider.stage
```
sets the `bar` output to `baz` and sets the `providerstage` output (note all lower-case) to `green`.

## CloudFormation

The CloudFormation YAML schema is supported. The input file can contain the CloudFormation template tags:

- `!And`
- `!Base64`
- `!Cidr`
- `!Condition`
- `!Equals`
- `!FindInMap`
- `!GetAtt`
- `!GetAZs`
- `!If`
- `!ImportValue`
- `!Join`
- `!Not`
- `!Or`
- `!Ref`
- `!Select`
- `!Split`
- `!Sub`

# See Also

[get-json-paths-action](https://github.com/gr2m/get-json-paths-action)

# Development

- [Package Structure](doc/development.md#package-structure)
- [Development Environment](doc/development.md#development-environment)
- [Quality](doc/development.md#quality)
- [Release](doc/development.md#release)

## License

This package is [MIT licensed](LICENSE).
