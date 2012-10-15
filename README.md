mutiny.js
=====
Tired of writing procedural code to generate Javascript UI elements in a
completely different section of the HTML document?  So are we!  Mutiny.js allows
you to declaratively create widgets in the same location by extending HTML5 data
attributes.

Usage
-----
1.  Add the HTML5 data attributes.

    ```html
    <span data-mutiny='{"toggler": "#target"}'>Toggle</span>
    <p id='target'>Toggle</p>
    ```

2.  Initialize Mutiny

    ```html
    <script src='mutiny.js'></script>
    <script>$(document).ready(Mutiny.init)</script>
    ```

3. There is no step 3!

Extending
-----
Javascript:
```javascript
var Mutiny = function(mutiny){
  mutiny.textToOptions = {
    'defaults': {'def': 'opt'},
    'init': function($instigator, options) {
      var s = [];
      for(var key in options) {
        s.push('"' + key + '": "' + options[key] + '"');
      }
      $instigator.text('{' + s.join(', ') + '}');
    }
  }

  return mutiny;
}(Mutiny || {});
```

HTML5:

```html
<div data-mutiny='{"textToOptions": {"custom": "arg"}}'></div>
```

Running Tests/Examples
-----
```console
$ git clone https://git.cashnetusa.com/ui/mutiny.git
$ cd mutiny
$ ./server.sh
$ open http://localhost:5100/
```

Licensing
-----
Mutiny is released by [Enova](http://www.enova.com) under the
[MIT License](https://github.com/enova/mutiny/blob/master/LICENSE).
