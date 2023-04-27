# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Deployment using Cloud Run

```
$ gcloud init
```

Configure project with gcp accout ( Set Account name, Project name )

```
$ gcloud iam service-accounts keys create {KEY_FILE_PATH} --iam-account {SERVICE_ACCOUNT_EMAIL}
```

Add access key json file path and service email

```
$ gcloud iam service-accounts keys create {KEY_FILE_PATH} --iam-account {SERVICE_ACCOUNT_EMAIL}
```

Export the access key credentials

```
$ gcloud run deploy
```

Deploy the project

### Add credentials for google signing

Before build the debug apk

Copy debug.keystore file from location

mobile/android/app/debug.keystore

and paste file in the following location

~/.android/

