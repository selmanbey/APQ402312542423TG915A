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

# Other notes / things worth mentiong:

- This app aims to fetch all repositories from an organization (through a loop of fetches) and handles filtering and pagination entirely on the front-end. This approach is not at all ideal, but is necessary to be able to achieve reliable "open issues" filtering (as Github REST API doesn't provide way to filter by "open issues").

- There's a `backend-filtering` branch, to illustrate a more conventional, safer way of searching with the Github REST API. In this branch, we don't have "open issues" filtering due to mentioned limitations (instead we have "stars" filtering). Surely, this branch fails to meet the criteria for the task, but I kept it there still, in case if you wish to have a peek. 
