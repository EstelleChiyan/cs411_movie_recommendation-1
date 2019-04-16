import React from "react";
import styled from "styled-components";

const Div = styled.div`
  margin: 40px;
  border: 5px outset pink;
  &:hover {
    background-color: yellow;
  }
`;

const Paragraph = styled.p`
  font-size: 15px;
  text-align: center;
`;

const OutsetBox = () => (
  <Div>
    <Paragraph>
      Get started with styled-components
      <span role="img" aria-label="sheep">
        🐑
      </span>
    </Paragraph>
  </Div>
);

export default OutsetBox;
