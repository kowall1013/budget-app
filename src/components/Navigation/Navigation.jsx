import React from "react";

import { Link } from "react-router-dom";

import { Wrapper } from "components";

import { Container, List } from "./Navigation.css";

function Navigation({ items }) {
  return (
    <Container>
      <Wrapper>
        <List>
          {items.map((item) => (
            <li key={item.path}>
              <Link to={item.to}>{item.content}</Link>
            </li>
          ))}
        </List>
      </Wrapper>
    </Container>
  );
}

export default Navigation;
