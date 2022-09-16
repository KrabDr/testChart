import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  z-index: 200;
  display: inline-block;
  border-radius: 5px;
  padding: 8px;
  margin: 0;
  background: white;

  transform: translate(-50%, calc(-100% - 8px));
  filter: drop-shadow(0 1px 5px #00000026);

  &:after {
    content: " ";
    position: absolute;
    top: 100%;
    left: calc(50% - 8px);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid white;
    transform: rotate(180deg);
  }
`;

export const ToolTip = React.forwardRef<HTMLDivElement, React.FC>(
  ({ children, ...props }, ref) => {
    return (
      <Wrapper ref={ref} {...props}>
        {children}
      </Wrapper>
    );
  }
);
