# APQ402312542423TG915A

## Production:

The "production" app requires no setup. For playing around purposes, you can find it here:

https://apq402312542423tg915a.vercel.app/

## Development:

To run the project locally, there are only few, very conventional / familiar steps. 

The most important thing is to have a `.env` file in the root of the repo, and let it contain your github api token:

```
REACT_APP_GITHUB_API_TOKEN=<your-personal-token>
```

Once you have your environment file set, you can install the dependencies and run the project locally:

```
npm install
npm start
```

This will get the app up and running on 
http://localhost:3000/

## Other notes / things worth mentiong:

- This app aims to fetch all repositories from an organization (through a loop of fetches) and handles filtering and pagination entirely on the front-end. This approach is not at all ideal, but is necessary to be able to achieve reliable "open issues" filtering (as Github REST API doesn't provide way to filter by "open issues").

- There's a `backend-filtering` branch, to illustrate a more conventional, safer way of searching with the Github REST API. In this branch, we don't have "open issues" filtering due to mentioned limitations (instead we have "stars" filtering). Surely, this branch fails to meet the criteria for the task, but I kept it there still, in case if you wish to have a peek. 

- I admit defeat when it comes to organization autocomplete. Writing an autocomplete input component is not an issue at all, but Github REST API, once again, does not provide any sensible way of filtering list of organizations by a given organization name. And it seems a rather impractical, costly and inefficient idea to make a request loop until we get all the organizations there is on Github and then provide an autocompleting on front-end.

  In real-life circumstances, I believe a solution might be to write an independent micro service that fetches and stores all the organization names from github, does a daily check to update its store, and provides the needed filtering on its own store. But doing something similar on the client side sounds a little like madness :) even if one is to cache this data on localStorage. We don't know how many organizations exist in Github and looping through requests until you reach the end (and this is to happen on every new user / browser) seems a sure way to eat up your rate limits.

  So the only autocomplete right now is the one that comes with the default html input behaviour, where browsers can suggest or automatically fill in values based on user's earlier inputs.

  Having said that, as the owners of the challenge, if you have neater approaches to this autocompletion problem, I'd love to hear them, discuss them and learn from them.