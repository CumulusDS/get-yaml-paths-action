# Get YAML Paths

This action reads a YAML file and outputs selected properties.

The action uses a [JMESPath](https://jmespath.org/) query to access properties at the provided paths. The `file` is the only input required. All other inputs are mapped into equally named outputs with the value at the given paths.

## Inputs

### `file`

**Required** The name of the file to load.

### `name: query`

Give each path to look-up as a `name: query` input pair. 

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
```yaml
uses: CumulusDS/get-yaml-paths-action@v1.0.1
with:
  file: file.yml
  bar: foo.bar
  providerStage: provider.stage
```
sets the `bar` output to `baz` and sets the `providerstage` output (note all lower-case) to `green`.

Object and array outputs are JSON-serialized. For example, given an input file `qux.yml`:
```yaml
qux:
  - bar: hello
  - bar: world
```

A step definition like this:
```yaml
uses: CumulusDS/get-yaml-paths-action@v1.0.1
with:
  file: qux.yml
  bars: qux[].bar
```

Sets the `bars` output to `["hello","world"]`.

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

## Possible Issues

### Quoting Special Characters

Keys with hyphens and other special characters should be quoted in the query. For example, given an input file like this:
```yaml
foo-bar: baz
```

Then use a step definition like this:
```yaml
uses: CumulusDS/get-yaml-paths-action@v1.0.1
with:
  file: file.yml
  foobar: '"foo-bar"'
```

The query should be `"foo-bar"` to get the value of the `foo-bar` key. Without the quotes, the query would be interpreted as a numerical subtraction, which would result in an error.

### GitHub Runner Warning

The inputs to this action cannot be statically defined or listed in the actions.yml definition. This results in a nuisance warning from the Actions Runner like this:
```
Warning: Unexpected input(s) '...', valid inputs are ['file']
```

The [actions/runner#514](https://github.com/actions/runner/issues/514) issue tracks this limitation of the Actions Runner.

# See Also

[get-json-paths-action](https://github.com/gr2m/get-json-paths-action)

# Development

- [Package Structure](doc/development.md#package-structure)
- [Development Environment](doc/development.md#development-environment)
- [Quality](doc/development.md#quality)
- [Release](doc/development.md#release)

## License

This package is [MIT licensed](LICENSE).
