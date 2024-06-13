#!/bin/bash

PROXY_TARGET_REWRITE_RULE="${PROXY_TARGET}/api/\$1"

FULL_REWRITE_RULE="/api/(.*) -> ${PROXY_TARGET_REWRITE_RULE}"

ws --port 3000 --spa index.html --directory tests/e2e/build --key key.pem --cert cert.pem --rewrite "${FULL_REWRITE_RULE}" --verbose