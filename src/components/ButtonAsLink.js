import styled from 'styled-components';

const ButtonAsLink = styled.button`
  display: block;
  background: none;
  color: #0077cc;
  border: none;
  padding: 0;
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
  :hover,
  :active {
    color: #004499;
  }
`;

export default ButtonAsLink;
