import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getRepos, getPageItems, filterRepos } from "./utils";
import { OPEN_ISSUES, ORG, PAGE, REPO } from "./consts";
import {
  Results,
  Pagination,
  TextParamInput,
  RangeParamInput,
  NoResults,
} from "./components";
import styles from "./Repos.module.css";
import { Button, Spinner } from "components";
import { Error } from "modules";
import { BaseError, ApiError } from "modules/errors/Errors";
import { handleError } from "modules/errors/utils";
import { GithubRepo } from "./types";
import RefreshIcon from "assets/refresh.svg";

const PER_PAGE = 10;
const STALE_TIME = 300000; // 5 minutes

const Repos: FC = () => {
  // URL PARAMS
  const [searchParams, setSearchParams] = useSearchParams();
  const org = searchParams.get(ORG) || "";
  const page = parseInt(searchParams.get(PAGE) || "1", 10);
  const repoName = searchParams.get(REPO) || "";
  const openIssues = searchParams.get(OPEN_ISSUES) || "*..*";

  // COMPONENT STATES
  const [customError, setCustomError] = useState<
    BaseError | ApiError | undefined
  >(undefined);
  const [manualRetry, setManualRetry] = useState(0);
  const [repos, setRepos] = useState<GithubRepo[]>([]);

  // DATA FETCHING
  const { data, isFetching } = useQuery(
    ["repos", { org, manualRetry }],
    () => getRepos({ org }),
    {
      keepPreviousData: true,
      staleTime: STALE_TIME,
      retry: false,
    }
  );

  // FRONT-END FILTERING
  useEffect(() => {
    setCustomError(undefined); // Remove stale error with new results
    setRepos(filterRepos(data?.items, { repoName, openIssues }));
    setSearchParams((prevParams) => {
      prevParams.set(PAGE, "1");
      return prevParams;
    });
  }, [data?.items, repoName, openIssues]);

  // ERROR HANDLING
  useEffect(() => {
    if (!data?.error) return;
    setCustomError(handleError(data.error));
  }, [data?.error]);

  const pages = Math.ceil((repos.length || PER_PAGE) / PER_PAGE);

  return (
    <div className={styles.repos}>
      {customError && (
        <Error
          message={customError.message}
          onClose={() => setCustomError(undefined)}
        />
      )}

      {/* SEARCH & FILTERS */}
      <div className={styles.inputs}>
        <div className={styles.searchInput}>
          <TextParamInput paramName={ORG} placeholder="Enter organization" />
          {org && customError && (
            <Button onClick={() => setManualRetry(manualRetry + 1)}>
              <img src={RefreshIcon} alt="Refresh" />
            </Button>
          )}
        </div>
        {org && (
          <div className={styles.filters}>
            <p className={styles.filtersLabel}>filter ::</p>
            <TextParamInput
              label="by repo:"
              paramName={REPO}
              placeholder="enter repository name"
            />
            <RangeParamInput label="by open issues:" paramName={OPEN_ISSUES} />
          </div>
        )}
      </div>

      {/* SEARCH RESULTS */}
      {Boolean(org) && (
        <div className={styles.table}>
          {isFetching && <Spinner />}
          {repos.length ? (
            <>
              <Results items={getPageItems(repos, page)} />
              <Pagination pages={pages} />
            </>
          ) : (
            <NoResults message="No results to show" />
          )}
        </div>
      )}

      {/* NO SEARCH */}
      {!Boolean(org) && <NoResults message="No search yet" />}
    </div>
  );
};

export default Repos;
