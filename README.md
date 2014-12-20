mutiny.js [![Build Status](https://secure.travis-ci.org/enova/mutiny.png)](http://travis-ci.org/enova/mutiny)
=====
Tired of writing procedural code to generate Javascript UI elements in a
completely different section of the HTML document?  So are we!  Mutiny.js allows
you to declaratively create widgets in the same location by extending HTML5 data
attributes.

Usage
-----
1.  Add the HTML5 data attributes.

    ```html
    <span data-mutiny-text-select=''>Click me to select all</span>
    ```

2.  Load Mutiny

    ```html
    <script src='src/core.js'></script>
    <script src='src/text-select.js'></script>
    ```

3. There is no step 3!

Extending
-----
Javascript:
```javascript
Mutiny.widgets.textReplace = {
  defaults: {'def': 'opt'},
  init: function(instigator, options) {
    var s = [];
    for(var key in options) {
      s.push('"' + key + '": "' + options[key] + '"');
    }
    instigator.textContent = '{' + s.join(', ') + '}');
  }
};
```

HTML5:

```html
<div data-mutiny-options-to-text='{"custom": "arg"}'></div>
```

Running Tests/Examples
-----
```console
$ git clone https://github.com/enova/mutiny.git
$ cd mutiny
$ ./server.sh
$ open http://localhost:5100/
```

Licensing
-----
Mutiny is released by [Enova](http://www.enova.com) under the
[MIT License](https://github.com/enova/mutiny/blob/master/LICENSE).
