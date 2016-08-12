# frampton-cli

A cli to aid in the building of framptonjs modules.

## Instalation

I always use the cli locally, on a per-module basis, and use 'npm run' to run the exposed frampton commands.

### Locally

```
npm install --save-dev frampton-cli
```

### Globally

```
npm install -g frampton-cli
```

## Build a Frampton Module

To build a frampton module to 'dist/' directory.

Include this in your package.json.

```
...
"scripts": {
  "build": "frampton build"
},
...
```

Then invoke the build from the command line.

```
npm run build
```

To build a frampton module to another directory use the --output flag.

```
...
"scripts": {
  "build": "frampton build --output ./temp"
},
...
```

## Run Tests for a Frampton Module

Update your package.json.

```
...
"scripts": {
  "test": "frampton test",
  "build": "frampton build"
},
...
```

Then invoke tests from the command line.

```
npm run test
```

## Release a Frampton Module

The release command runs a new build, bumps the version, commits the version bump and publishes the new version to github and npm. By default the command does a patch version bump. It can be given flags to do major and minor version bumps as well.  It can also take an output path other than the default 'dist/'.

Update your package.json.

```
...
"scripts": {
  "test": "frampton test",
  "build": "frampton build",
  "patch-release": "frampton release --patch",
  "minor-release": "frampton release --minor",
  "major-release": "frampton release --major"
},
...
```
