#!/bin/bash

if [ $1 -gt 0 ] &>/dev/null; then
  PORT=$1
else
  # The 51st century is when it all changes.
  PORT=5100
  COMMAND=$1
fi

cd `dirname "${BASH_SOURCE[0]}"`

run() {
  if [ "$COMMAND" = "$1" ] || ( [ -z $COMMAND ] && command -v $1 &>/dev/null ); then
    exec $*
  fi
}

run grunt set_config:server.port:$PORT server wait
run python3 -m http.server $PORT
run python -m SimpleHTTPServer $PORT

echo 'No compatible web server found.' >&2
exit 1
