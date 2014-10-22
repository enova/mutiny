#!/bin/bash

if [ $1 -gt 0 ] &>/dev/null; then
  PORT=$1
else
  # The 51st century is when it all changes.
  PORT=5100
  COMMAND=$1
fi

# cd into executing script's directory
cd `dirname "${BASH_SOURCE[0]}"`

run() {
  if [ "$COMMAND" = "$1" ] || ( [ -z "$COMMAND" ] && command -v "$1" &>/dev/null ); then
    exec $*
  fi
}

# if run is successful, it will replace current process so rest of the script is automatically aborted
#run grunt connect --port=$PORT
run python3 -m http.server $PORT
run python -m SimpleHTTPServer $PORT

echo 'No compatible web server found.' >&2
exit 1
