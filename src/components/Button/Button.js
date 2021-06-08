import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { StyledInlineButton, StyledRegularButton } from "./Button.css";

function Button({ variant, children, ...props }) {
  const { to } = props;
  const Component = useMemo(() => {
    switch (variant) {
      case "inline":
        return StyledInlineButton;
      case "regular":
        return StyledRegularButton;

      default:
        return StyledRegularButton;
    }
  }, [variant]);

  const content = useMemo(() => <Component {...props}>{children}</Component>, [children, props]);

  return to ? <Link {...props}>{content}</Link> : <>{content}</>;
}

Button.propTypes = {
  variant: PropTypes.oneOf(["inline", "regular"]),
};

export default Button;
