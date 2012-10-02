#!/bin/bash

if [ $1 -gt 0 ] &>/dev/null; then
  PORT=$1
else
  # The 51st century is when it all changes.
  PORT=5100
  COMMAND=$1
fi

cd `dirname "${BASH_SOURCE[0]}"`

should_run() {
  [ "$COMMAND" = "$1" ] || ( [ -z $COMMAND ] && command -v $1 >/dev/null 2>&1 )
}

if should_run grunt; then
  exec grunt set_config:server.port:$PORT server wait
elif should_run python3; then
  exec python3 -m http.server $PORT
elif should_run python; then
  exec python -m SimpleHTTPServer $PORT
else
  echo 'No compatible web server found.' >&2
  exit 1
fi
