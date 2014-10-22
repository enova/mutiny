## Fixtures

The fixtures module allows you to load HTML content to be used by your tests.

Your fixture is being loaded into an iframe container that is automatically added to the DOM.  Fixtures are internally cached, so you can load the same fixture file in several tests without penalty to your test suite's speed.

The code was completely refactored from the awesome jasmine-jquery with all jasmine and jquery dependencies removed, specs written with Chai + Mocha, and using an iframe implementation as a sandbox.  This allows the fixtures to be more portable and minimizes side effects with the test runner.

## Installation

```
npm install js-fixtures // if you use npm
bower install fixtures // or if you prefer bower
```

then within your test runner:

```
<script src="fixtures.js"></script>

// or if you prefer AMD:
define(['fixtures'], function(fixtures){
  ...
})
```

## Usage

Use `fixtures.load('your-fixture.html')` in your specs.  Fixtures will load from `/specs/javascript/your-fixture.html` (see below to change this path).

Clean up fixtures with `fixtures.cleanUp` (perhaps in a `afterEach()` block)

## Documentation

Several methods for loading fixtures are provided:

- `load(fixtureUrl[, fixtureUrl, ...])`
  - Loads fixture(s) from one or more files and automatically appends them to the DOM (to the fixtures container).
- `set(html)`
  - Same as `load` except you may load markup directly without specifying a path
- `sandbox(jsObject)`
  - Creates a quick fixture from the js object you provide (ex. `sandbox({id: 'foo-fixture', class: 'cool'})` )
- `read(fixtureUrl[, fixtureUrl, ...])`
  - Loads fixture(s) from one or more files but instead of appending them to the DOM returns them as a string (useful in combination with `set` if you want to use a templating engine).
- `cache(fixtureUrl[, fixtureUrl, ...])`
  - Pre-loads fixture(s) from one or more files and stores them into cache, without returning them or appending them to the DOM.

Additionally, two clean up methods are provided:

- `clearCache()`
  - purges internal cache
- `cleanUp()`
  - cleans-up fixtures container

Finally, there are two convenience properties to access the contents of the sandboxed iframe:
- `body`
  - returns the html contents of the body.  Use it to assert various values on the body of the iframe DOM.
- `window`
  - returns the global window reference of the iframe, giving you the ability to use the global variables injected into that context.
  
Options:
- `fixtures.containerId`
  - change the ID of the iframe that gets injected into the page
- `fixtures.path`
 - change the path to look for fixtures (default: `spec/javascripts/fixtures`)

## Executing Tests
Do an `npm install` to grab the test dependencies.  Then point your browser to the test/index.html file.

## Cross domain policy problems under Chrome

Newer versions of Chrome don't allow file:// URIs read other file:// URIs. In effect, js-fixtures cannot properly load fixtures under some versions of Chrome. An override for this is to run Chrome with a switch `--allow-file-access-from-files`.  Another way is to ensure that you are executing the test runner under a web server.
