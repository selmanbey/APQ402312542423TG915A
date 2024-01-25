import octokit from "octoConfig";
import { GithubRepo } from "./types";
import { convert } from "./components/RangeParamInput/utils";

export const getRepos = async ({ org }: { org: string }) => {
  // No organization, no query
  if (!org) {
    return;
  }

  let page = 1;
  let allRepos: GithubRepo[] = [];

  // We want to do all the filtering in the FE due to Github API's limitations
  // For that, we fetch all available items by making as many requests as necessary
  while (true) {
    try {
      const data = await octokit
        .request("GET /search/repositories", {
          q: `org:${org}`,
          page,
          per_page: 100,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          if (error.status === 422) {
            // Error for not having any query results
            // We handle it gracefully, without showing error
            return {
              items: [],
            };
          }

          throw error;
        });

      const repos = data.items || [];

      // If there are no more repos to fetch, break the loop
      if (!repos || repos.length === 0) {
        break;
      }

      // Arbitrary restriction to avoid exhausting resources & rate limits
      // If such restrictions are not allowed, we may remove this restriction
      if (page === 10) {
        throw new Error(
          "Too many repositories to fetch (>1000).\n Displaying only the first 1000."
        );
      }

      // Otherwise continue collecting all the repos
      allRepos = [...allRepos, ...repos];
      page++;
    } catch (error) {
      return {
        items: allRepos,
        error,
        lastPage: page,
      };
    }
  }

  return {
    items: allRepos,
    error: undefined,
  };
};

export const getPageItems = (repos: any[], page: number, pageSize = 10) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  return repos.slice(startIndex, endIndex);
};

export const filterRepos = (
  repos: GithubRepo[] = [],
  { repoName, openIssues }: { repoName: string; openIssues: string }
): GithubRepo[] => {
  if (repoName) {
    repos = repos.filter((r) => r.name.includes(repoName));
  }

  if (openIssues) {
    const [minParam, maxParam] = convert.fromUrl(openIssues);

    const min = minParam ? parseInt(minParam, 10) : 0;
    const max = maxParam ? parseInt(maxParam) : Infinity;

    repos = repos.filter(
      (r) => r.open_issues_count >= min && r.open_issues_count < max
    );
  }

  return repos;
};
