#!/bin/sh
set -e
CYAN='\033[1;36m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

VERSION_HASH=$(sentry-cli releases propose-version)
export SENTRY_ORG="caleb-ukle"
export SENTRY_PROJECT="portfolio"

export VERSION="v2.0.0:$VERSION_HASH"



if [ "$CONTEXT" = 'production' ]; then
  echo "${CYAN}> Running production build ${NC}"
  echo "${CYAN}> Creating releases $VERSION ${NC}"

  sentry-cli releases --org "$SENTRY_ORG" --project "$SENTRY_PROJECT" new --version "$VERSION"
  sentry-cli releases set-commits "$VERSION" -c "caleb-ukle/portfolio@$VERSION_HASH"

  export DO_SEARCH_INDEX="TRUE"

  npm run build:prod

  echo "${CYAN}> Deploying Firebase functions${NC}"

  cd functions

  npm install

  cd ..

  node_modules/.bin/firebase deploy --token $FIREBASE_TOKEN

  echo "${CYAN}> Uploading sourcemaps ${NC}"

  sentry-cli releases --org "$SENTRY_ORG" --project "$SENTRY_PROJECT" files "$VERSION" upload-sourcemaps --validate --rewrite ./dist/static

  echo "${CYAN}> Finalizing release${NC}"
  sentry-cli releases --org "$SENTRY_ORG" --project "$SENTRY_PROJECT" finalize "$VERSION"

else
  echo "${CYAN}> Running non production build ${NC}"
  export DO_SEARCH_INDEX="FALSE"
  npm run build
  echo "${YELLOW}> Non production builds do not deploy firebase functions"

fi

echo "${CYAN}> Done ${NC}"