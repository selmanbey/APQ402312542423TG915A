import Table, { TH, TR } from "components/Table/Table";
import { FC } from "react";
import { GithubRepo } from "../types";
import Result from "./Result";

interface Props {
  items?: GithubRepo[];
}

const Results: FC<Props> = ({ items = [] }) => {
  return (
    <Table>
      <thead>
        <TR>
          <TH>Name</TH>
          <TH>Open Issues</TH>
          <TH>Stars</TH>
        </TR>
      </thead>
      <tbody>
        {items.map((repo) => (
          <Result
            key={repo.id}
            name={repo.name}
            url={
              repo.owner?.login && repo.name
                ? `https://github.com/${repo.owner.login}/${repo.name}`
                : undefined
            }
            openIssues={repo.open_issues_count}
            stars={repo.stargazers_count}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default Results;
