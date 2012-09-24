#!/bin/bash

PORT=${1:-5100}

cd `dirname "${BASH_SOURCE[0]}"`
exec python -m SimpleHTTPServer $PORT
