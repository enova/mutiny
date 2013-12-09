[v0.3.1 (2013-12-09)](https://github.com/enova/mutiny/compare/0.3.0...0.3.1)
======
* Toggler now has separate configurations for `self` and `target`.  By default,
  `target` will inherit the defined classes of `self`.

[v0.3.0 (2013-12-09)](https://github.com/enova/mutiny/compare/0.2.0...0.3.0)
======
* `Mutiny.options.initOnReady` flag that can be set to false if Mutiny is to be
  manually triggered.
* Toggler has a new syntax.  Please check examples for further information.
* Toggler now supports checkboxes.
* Accordion now uses jQueryUI default options.

[v0.2.0 (2013-04-03)](https://github.com/enova/mutiny/compare/0.1.0...0.2.0)
======
* New syntax: `<a data-mutiny='{"toggler":{"target":"#target","preventDefault":true}}'>`
  becomes `<a data-mutiny-toggler='{"target":"#target","preventDefault":true}'>`.
  The old syntax is now deprecated.
* Build files `mutiny.js` and `mutiny.min.js` are now wrapped within their own
  closure.
* Accordion menu support is removed.  The old behavior is now emulated using
  hash changes.

[v0.1.1 (2012-02-22)](https://github.com/enova/mutiny/compare/0.1.0...0.1.1)
======
* Datepicker widget now correctly passes options into jQueryUI init.

v0.1.0 (2012-01-30)
======
* Initial release.
