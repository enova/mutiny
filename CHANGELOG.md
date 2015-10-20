#### v2.0.0 *PENDING*

* Default `initOnInsert` to true
* Removed IE8 "support"
* Removed `Mutiny.util.isArray` and `Mutiny.util.isString` helper methods

#### [v1.2.0 (2015-08-20)](https://github.com/enova/mutiny/compare/v1.1.1...v1.2.0)

* jq-toggler:
  * handle multiple togglers against one target

#### [v1.1.1 (2015-08-18)](https://github.com/enova/mutiny/compare/v1.1.0...v1.1.1)

* jq-toggler:
  * return useful values when manually invoked

#### [v1.1.0 (2015-08-10)](https://github.com/enova/mutiny/compare/v1.0.1...v1.1.0)

* Slightly better minification
* Slightly faster initialization
* jq-toggler:
  * support for `autoFocusTarget`
  * automatically check for id on `target` (e.g. `target: 'top-level'` becomes `target: '#top-level'`)

#### [v1.0.1 (2015-02-23)](https://github.com/enova/mutiny/compare/v1.0.0...v1.0.1)

* Added additional check for window.onload event

#### [v1.0.0 (2014-12-20)](https://github.com/enova/mutiny/compare/0.3.1...v1.0.0)

* Removed core dependency on jQuery. Many widgets still depend on jQuery-like library (e.g. jQuery or Zepto)
* Bower support
* Releases no longer bundle together a single file
* Removed deprecated behavior
* Renamed widgets:
  * toggler => jq-toggler
  * accordion => jqui-accordion
  * datepicker => jqui-datepicker
  * slider => jqui-slider
* New widgets:
  * text-select
  * jq-ajax-replace
* Replaced Grunt with Gulp
* Replaced Jasmine with Mocha/Chai

#### [v0.3.1 (2013-12-09)](https://github.com/enova/mutiny/compare/0.3.0...0.3.1)

* Toggler now has separate configurations for `self` and `target`.  By default,
  `target` will inherit the defined classes of `self`.

#### [v0.3.0 (2013-12-09)](https://github.com/enova/mutiny/compare/0.2.0...0.3.0)

* `Mutiny.options.initOnReady` flag that can be set to false if Mutiny is to be
  manually triggered.
* Toggler has a new syntax.  Please check examples for further information.
* Toggler now supports checkboxes.
* Accordion now uses jQueryUI default options.

#### [v0.2.0 (2013-04-03)](https://github.com/enova/mutiny/compare/0.1.0...0.2.0)

* New syntax: `<a data-mutiny='{"toggler":{"target":"#target","preventDefault":true}}'>`
  becomes `<a data-mutiny-toggler='{"target":"#target","preventDefault":true}'>`.
  The old syntax is now deprecated.
* Build files `mutiny.js` and `mutiny.min.js` are now wrapped within their own
  closure.
* Accordion menu support is removed.  The old behavior is now emulated using
  hash changes.

#### [v0.1.1 (2012-02-22)](https://github.com/enova/mutiny/compare/0.1.0...0.1.1)

* Datepicker widget now correctly passes options into jQueryUI init.

#### v0.1.0 (2012-01-30)

* Initial release.
