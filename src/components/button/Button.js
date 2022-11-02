import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../loading/LoadingSpinner";
import PropTypes from "prop-types";

const ButtonStyles = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: white;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  height: ${(props) => props.height || "66px"};
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type pf Button 'button' || 'submit'
 * @returns
 */

const Button = ({
  type = "button",
  onClick = () => {},
  children,
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  return (
    <ButtonStyles type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
