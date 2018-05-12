#!/bin/bash

CURRENT_VERSION=$(cat wallet-lib/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

echo "Current Version: $CURRENT_VERSION"
echo "Type the version that you want to set (X.X.X format), followed by [ENTER]:"
read NEXT_VERSION

# STEP NPM
echo "Setting package.json version:     $NEXT_VERSION"
cd wallet-lib
npm version ${NEXT_VERSION}
cd ..

# STEP BUILD
set -e  # terminates on error
npm run build:lib
set +e

# STEP PUBLISH
echo "Publish version:                  $NEXT_VERSION"
git push --follow-tags

npm publish dist/wallet-lib --registry https://npm.scienceroots.com
