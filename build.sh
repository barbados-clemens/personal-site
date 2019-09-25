#!/bin/sh
VERSION_HASH=$(sentry-cli releases propose-version)
export SENTRY_ORG="caleb-ukle"
export SENTRY_PROJECT="portfolio"


VERSION="v1.0.0:$VERSION_HASH"

if [ "$CONTEXT" = 'production' ]; then
  echo "Creating releases $VERSION"

  sentry-cli releases --org "$SENTRY_ORG" --project "$SENTRY_PROJECT" new --version "$VERSION"
  #sentry-cli releases set-commits "$VERSION" -c "caleb-ukle/portfolio@$VERSION_HASH"
fi

echo "Running Build"
npm run build
if [ "$CONTEXT" = 'production' ]; then
  echo "Uploading sourcemaps"
  sentry-cli releases --org "$SENTRY_ORG" --project "$SENTRY_PROJECT" files "$VERSION" upload-sourcemaps --validate --rewrite ./public

  echo "Finalizing release"
  sentry-cli releases --org "$SENTRY_ORG" --project "$SENTRY_PROJECT" finalize "$VERSION"
fi
