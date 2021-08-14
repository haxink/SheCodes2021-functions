# SheCodes2021 Firebase Cloud Functions

This project is a for the Google Cloud Functions used together with Firebase.

## Getting started

To start clone the repository as usual and install its dependencies.

```bash
git clone https://github.com/haxink/SheCodes2021-functions.git
cd functions
npm install
```

To run and debug functions locally follow the steps described.

### Run functions locally

1. In the Angular Frontend project find the place where the `AngularFireFunctionsModule` is imported. This is likely in the `app.module`. You can provide a `ORIGIN` constant to point at a local server.

```typescript
// app.module.ts

// Import the module and constant
import { AngularFireFunctionsModule, ORIGIN } from '@angular/fire/functions';

// Module import
impots: [
    AngularFireFunctionsModule
]
// Add a provider
providers: [
//Local emulation of cloud functions
// 5001 is the default port used by firebase CLI
{ provide: ORIGIN, useValue: 'http://localhost:5001' }
],
```

2. Start the emulator with Firebase CLI

```bash
firebase emulators:start --only functions

# Output similar to this:
functions: Emulator started at http://localhost:5001
```

### Ennvironment variables (i.e. API keys)

If you need to work with private keys such as secret keys to access some APIs you should NOT place those as constant in the code as that way it will likely be commited to the repository and risks to get exposed. Instead use environment variables.

To set an environment variable use Firebase CLI

```
firebase functions:config:set <namespace>.<key_name>="my secret"
```

To use the environment variable in your functions do the following.

```javascript
// cloud_functions.js

const functions = require('firebase-functions');
const mySecretVariable = functions.config().namespace.key_name
```

To make the environment variables **available localally** you should place them in a `functions/.runtimeconfig.json` file which is loaded automatically by the emulator. Do the following to create that file:

```bash
// inside /functions directory

firebase functions:config:get > .runtimeconfig.json
# If using Windows PowerShell, replace the above with:
# firebase functions:config:get | ac .runtimeconfig.json
```

## Deploy

Once debugged and stable locally you can deploy the functions to production with Firebase CLI easily. Check `.firebaserc` to see the different deploy targets configured.

To add another deploy target you can select a new firebase project to be associated with your repo. The following command will also allow you to specifiy an alias for the new target/firebase project:

```bash
firebase use --add
```

To deploy to a specific deploy target do the following:

```bash
# Point the CLI at the deploy target
firebase use <alias>
firebase deploy

# alternatively with the following flag
firebase deploy -P <alias>
```

```bash
firebase deploy --only functions

## To save time only deploy a specific function you updated
firebase deploy --only functions:myFunction
```
