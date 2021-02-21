# An opinionated firebase scaffold

An ever-evolving, opinionated architecture and development environment for writing and structuring google cloud functions for firebase. It takes into account performance of cloud functions, and developer productivity.


## Features

- **[Improved cold start performance](#improved-cold-start)** - Cold start/boot time is one of the biggest issues many developers and companies come across when using cloud functions. This boilerplate uses the best practices to reduce the cold start time thus improving performance.

- **[Improved readability & developer experience](#improved-readability-&-developer-experience)** - Using only one file, `index.js` for everything doesn't work for a serious app. It becomes hard to scan through, hard to easily follow up with the code. This boilerplate recognizes that and aims to solve that.

- **[TypeScript](#typescript)** - While everything done here can be achieved using plain JavaScript, it would require more code, a lot of experience using JavaScript, and time, which in my opinion is counter-intuitive. You should not have to spend time optimizing the tool to achieve a task!

- **[Express.js](#express.js)** - Every HTTP request makes use of `express.js` underneath, but explicitly using it in structuring your endpoints has proved to more beneficial, both in structure and maximization of resources.

- **[Multiple environments (local, dev, prod)](#service-accounts-and-environments)** - A simple convetion enables the same code to run on multiple environments.

- **[Testability](#unit-tests)** - The recomended architecture enables simple unit tests with minimum external dependencies.

- **[Straight foward deployment](#deploying)** - Running the code locally, or deploying to multiple environments should be simple. You run one command and your code is deployed in seconds.

### Integration tests
- Uses `dev service-account` and a `test schema` 
- The test schema is injected
- use custom node script to run the tests 

#### Service-accounts and environments
This project supports two environments.
One is meant to be a development environment, `dev` and the other should be a production environment, `prod`.
- `./firebaserc` defines alias for their firebase project id's
- `./functions/service-account/` should have the respectives `service-account` [files](https://console.firebase.google.com/project/fir-test-iurysza-dev/settings/serviceaccounts/adminsdk)
	- `dev-service-account.json` for dev environment
	- `prod-service-account.json` for prod environment 

### Deploying 
- `build` runs the `Typescript` compiler
- `serve` runs `build` and the `firebase` cli with emulators
- `local` runs a `shell` script that makes sure we're using `dev` credentials
- `deploy:staging` runs a `shell` script that makes sure we're using `dev` credentials
- `deploy:prod` runs a `shell` script that makes sure we're using `prod` credentials


## Documentation

### Improved cold start performance

Cold start (Cold boot) time has been one of the [biggest issues](https://www.youtube.com/watch?v=IOXrwFqR6kY) many developers and companies come across when using cloud functions. This boilerplate uses the best practices to reduce the cold start time thus improving performance.

By taking advantage of TypeScripts [dynamic 'async' import](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-4.html#dynamic-import-expressions), this ensures unused code and imports and not loaded unncessarily during start time but only when the specific function is invoked.

### Improved readability & developer experience

Using only one file, `index.js`, for everything doesn't work for a serious app. It becomes hard to scan through, hard to easily follow up with the code. This scaffold recognizes that and aims to solve that.

There have been a lot of ways suggested to split cloud functions properly, Firebase also has [suggestions](https://firebase.google.com/docs/functions/organize-functions), but it doesn't take into account the effect on the **cold start time**.

### Express.js

Every Firebase HTTP function makes use of `express.js` underneath. Explicitly using it in structuring your endpoints has proved to more beneficial, both in structure and maximization of resources.

- All your HTTP requests are now accessed through one Cloud Function. This helps with the "Number of functions" limit (which is 1,000), meaning no matter the number of endpoints you have, they would all count as one function.
- Improves cold start time - Due to the way cloud functions are invoked, having all endpoints accessible through one function enables instances to be reused.
