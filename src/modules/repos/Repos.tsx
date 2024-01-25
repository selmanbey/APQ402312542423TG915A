import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getRepositories } from "./utils";
import { OPEN_ISSUES, ORG, PAGE, REPO } from "./consts";
import {
  Results,
  Pagination,
  TextParamInput,
  RangeParamInput,
  NoResults,
} from "./components";
import styles from "./Repos.module.css";
import { Spinner } from "components";
import { Error } from "modules";
import { BaseError, ApiError } from "modules/errors/Errors";
import { handleError } from "modules/errors/utils";

const PER_PAGE = 10;
const STALE_TIME = 300000; // 5 minutes

const Repos: FC = () => {
  const [searchParams] = useSearchParams();
  const org = searchParams.get(ORG) || "";
  const repo = searchParams.get(REPO) || "";
  const page = parseInt(searchParams.get(PAGE) || "1", 10);
  const openIssues = searchParams.get(OPEN_ISSUES) || "*..*";

  const [customError, setCustomError] = useState<
    BaseError | ApiError | undefined
  >(undefined);

  const { data, isFetching, error } = useQuery(
    ["repositories", { org, repo, openIssues, perPage: PER_PAGE, page }],
    () => getRepositories({ org, repo, openIssues, perPage: PER_PAGE, page }),
    {
      keepPreviousData: true,
      staleTime: STALE_TIME,
      retry: false,
    }
  );

  useEffect(() => {
    if (!error) return;
    setCustomError(handleError(error));
  }, [error]);

  const pages = Math.ceil((data?.total_count || 10) / PER_PAGE);

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
        <TextParamInput paramName={ORG} placeholder="Enter organization" />
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
          {data && Boolean(data.items?.length) ? (
            <>
              <Results items={data.items} />
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
