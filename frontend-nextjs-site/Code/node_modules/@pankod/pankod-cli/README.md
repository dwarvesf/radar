@pankod/pankod-cli
==================

<p align="center">
  <img src="./cover.gif" />
</p>

Save a lot of time by generating services, components, tests for Pankod Boilerplate projects

[![Maintainability](https://api.codeclimate.com/v1/badges/2c2209c30b0d428bab96/maintainability)](https://codeclimate.com/github/pankod/pankod-cli/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2c2209c30b0d428bab96/test_coverage)](https://codeclimate.com/github/pankod/pankod-cli/test_coverage)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@pankod/pankod-cli.svg)](https://npmjs.org/package/@pankod/pankod-cli)
[![Downloads/month](https://img.shields.io/npm/dm/@pankod/pankod-cli.svg)](https://npmjs.org/package/@pankod/pankod-cli)
[![License](https://img.shields.io/npm/l/@pankod/pankod-cli.svg)](https://github.com/Pankod/pankod-cli/blob/master/package.json)

<!-- usage -->
```sh-session
$ npm install -g @pankod/pankod-cli
$ pankod-cli COMMAND
running command...
$ pankod-cli (-v|--version|version)
@pankod/pankod-cli/1.0.0 darwin-x64 node-v10.16.3
$ pankod-cli --help [COMMAND]
USAGE
  $ pankod-cli COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`pankod-cli add Page`](#pankod-cli-add-page)
* [`pankod-cli help [COMMAND]`](#pankod-cli-help-command)

## `pankod-cli add Page`

Add services, components and more...

```
USAGE
  $ pankod-cli add Page
  $ pankod-cli add Component
  $ pankod-cli add ClassComponent
  $ pankod-cli add FunctionalComponent
  $ pankod-cli add Plugin
  $ pankod-cli add Repository
  $ pankod-cli add Service
```

_See code: [src/commands/add/index.ts](https://github.com/Pankod/pankod-cli/blob/v1.0.0/src/commands/add/index.ts)_

## `pankod-cli help [COMMAND]`

display help for pankod-cli

```
USAGE
  $ pankod-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_
<!-- commandsstop -->
# :package: Elements

### `pankod-cli add <element>`

Add services, components and more...

```sh
  # nextjs2
  $ pankod-cli add Page
  $ pankod-cli add Component

  # nextjs
  $ pankod-cli add Page
  $ pankod-cli add ClassComponent
  $ pankod-cli add FunctionalComponent

  # moleculer  
  $ pankod-cli add Service
  $ pankod-cli add Repository

  # svelte
  $ pankod-cli add Component
```

_See code: [src/commands/add](https://github.com/Pankod/pankod-cli/blob/v0.3.3/src/commands/add/index.ts)_
<!-- elementsstop -->
<!-- customization -->
# :building_construction: Customization

[Checkout Wiki](https://github.com/pankod/pankod-cli/wiki) to read about customization and extending the power of your fingers.
<!-- customization -->
