import octokit from "octoConfig";

export const getRepositories = async ({
  org,
  repo,
  openIssues,
  perPage,
  page,
}: {
  org: string;
  repo: string;
  openIssues: string;
  perPage: number;
  page: number;
}) => {
  if (!org) {
    return;
  }

  let query = `org:${org}`;
  if (repo) query += ` in:name ${repo}`;
  if (openIssues) query += ` stars:${openIssues}`;

  return await octokit
    .request("GET /search/repositories", {
      q: query,
      per_page: perPage,
      page,
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
        return;
      }

      return error;
    });
};
