#!/bin/bash

PORT=${1:-5100}

exec python -m SimpleHTTPServer $PORT
