import styled from "styled-components";

export const CommonInput = styled.input`
  width: 100%;
  border: 2px solid #ff5809;
  border-radius: ${(props) => props.$borderRadius};
  text-decoration: none;
  padding: 15px 10px;

  &:focus {
    outline: none;
  }
`;

export const CommonSelect = styled.select`
  width: 100%;
  border: 2px solid #ff5809;
  border-radius: ${(props) => props.$borderRadius};
  text-decoration: none;
  padding: 15px 10px;

  &:focus {
    outline: none;
  }
`;

export const Container = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: flex-start;
  flex-direction: column;
  width: 80%;
  gap: 10px;
  padding: 30px 0;
`;

export const Wrapper = styled.div`
  display: flex;
  width: ${(props) => props.$width};
  flex-direction: ${(props) => (props.$direction ? props.$direction : "row")};
  gap: ${(props) => props.$gap};
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$fontSize};
  font-family: ${(props) => props.$fontFamily};
  justify-content: ${(props) => props.$justifyContent};
  border: ${(props) => props.$border && "2px solid tomato"};
  position: ${(props) => props.$position};
  margin: ${(props) => props.$margin};
  padding: ${(props) => props.$padding};

  @media screen and (max-width: 768px) {
    flex-wrap: ${(props) => props.$RWD};
    width: 100%;
  }
`;

//btn
export const RemoveBtn = styled.button`
  border: none;
  outline: none;
  background: transparent;
  box-shadow: none;
  position: absolute;
  right: 0;
  color: #ff5809;
  font-size: 18px;
  cursor: pointer;
`;

export const AddBtn = styled.button`
  border: none;
  outline: none;
  background: transparent;
  box-shadow: none;
  font-size: 18px;
  color: #1aacac;
  font-weight: 600;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
`;

export const DividerLine = styled.hr`
  width: 100%;
  border: none;
  height: 2px;
  background-color: ${(props) => props.$bgColor};
`;

export const DecorationText = styled.div`
  display: flex;
  width: ${(props) => props.$width};
  padding: ${(props) => props.$padding};
  border-radius: ${(props) => props.$borderRadius};
  color: ${(props) => props.$color};
  background-color: ${(props) => props.$bgColor};
  font-size: ${(props) => props.$fontSize};
  font-family: ${(props) => props.$fontFamily};
  font-weight: ${(props) => props.$fontWeight};
  justify-content: ${(props) => props.$justifyContent};
  align-items: ${(props) => props.$alignItems};
  border: ${(props) => props.$border};
`;
