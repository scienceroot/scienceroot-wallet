#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

# setup npm
npm install

# set placeholder
replace 'scienceroot' $1 . -r && replace 'wallet' $2 . -r

# remove git of bd-base-lib 
rm -rf .git

# setup git
git init
git add -A
git commit -m "Initial commit"