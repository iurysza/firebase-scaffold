export GOOGLE_APPLICATION_CREDENTIALS="service-account/dev-service-account.json"
firebase functions:config:get > .runtimeconfig.json
npm run serve