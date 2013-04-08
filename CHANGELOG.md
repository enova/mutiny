v0.2.0 (2013-04-03)
======
* New syntax: `<a data-mutiny='{"toggler":{"target":"#target","preventDefault":true}}'>`
  becomes `<a data-mutiny-toggler='{"target":"#target","preventDefault":true}'>`.
  The old syntax is now deprecated.
* Build files `mutiny.js` and `mutiny.min.js` are now wrapped within their own
  closure.
* Accordion menu support is removed.  The old behavior is now emulated using
  hash changes.

v0.1.1 (2012-02-22)
======
* Datepicker widget now correctly passes options into jQueryUI init.

v0.1.0 (2012-01-30)
======
* Initial release.
