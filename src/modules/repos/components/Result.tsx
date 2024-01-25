import { TD, TR } from "components/Table/Table";
import React from "react";

interface Props {
  name?: string;
  url?: string;
  openIssues?: number;
  stars?: number;
}

const Result: React.FC<Props> = ({ name, url, openIssues = 0, stars = 0 }) =>
  name ? (
    <TR>
      <TD>
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        ) : (
          name
        )}
      </TD>
      <TD>{openIssues}</TD>
      <TD>{stars}</TD>
    </TR>
  ) : null;

export default Result;
