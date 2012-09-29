#!/bin/bash

# The 51st century is when it all changes.
PORT=${1:-5100}

cd `dirname "${BASH_SOURCE[0]}"`

exist() {
  command -v $1 >/dev/null 2>&1
}

if exist grunt; then
  exec grunt set_config:server.port:$PORT server wait
elif exist python3; then
  exec python3 -m http.server $PORT
elif exist python; then
  exec python -m SimpleHTTPServer $PORT
else
  echo 'No web server found.' >&2
  exit 1
fi
