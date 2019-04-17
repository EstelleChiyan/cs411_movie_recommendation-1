import React from "react";
import styled from "styled-components";

const Div = styled.div`
  margin: 20px;
  border: 5px outset pink;
  &:hover {
    background-color: white;
  }
`;

const Paragraph = styled.p`
  font-size: 16px;
  text-align: center;
`;

const OutsetBox = () => (
  <Div>
    <Paragraph>
      <span role="img" aria-label="sheep">
        🎬
      </span>
      Overview
    </Paragraph>
  </Div>
);

export default OutsetBox;
