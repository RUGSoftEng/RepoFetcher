# RepoFetcher
A program for downloading a list of repositories from this organisation and read the docs-folder.

#### Requirements
* NodeJS - For running the program
* NPM - For installing the GitHub API library
* SVN - For downloading a folder from GitHub through the command line.

#### Running the program
`npm start` - This will install the GitHub API library and then run the program.

Alternatively, you can run `npm install` followed by `node index.js`.

#### Notes
Since the GitHub API is quite limited for unauthenticated users, this program can only be ran a couple of times before GitHub blocks your IP address (for a limited time) for exceeding the API request limit.
