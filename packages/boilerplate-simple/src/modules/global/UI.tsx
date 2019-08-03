import { Card } from "antd";
import GlobalCount from "components/GlobalCount";
import React, { ReactElement } from "react";
import styled from "styled-components";

const UI1: typeof GlobalCount = styled(GlobalCount)`
  margin-top: 1rem;
`;

const UI2: typeof GlobalCount = styled(GlobalCount)`
  margin-top: 1rem;
`;

export default function UI(props: any): ReactElement<void> {
  return (
    <Card>
      <Card.Meta
        title={props.meta.title}
        description={props.meta.description}
      />
      <UI1 {...props} />
      <UI2 {...props} />
    </Card>
  );
}
