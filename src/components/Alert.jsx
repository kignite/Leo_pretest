import React from "react";
import { DecorationText, Wrapper } from "../css/common";

export default function Alert(props) {
  const { error, hint } = props;
  return (
    <>
      <DecorationText
        $bgColor={"#FFF3EE"}
        $color={"#FF5809"}
        $padding={"10px 6px"}
        $borderRadius={"5px"}
        $fontWeight={"600"}
        $fontSize={"16px"}
      >
        {error}
      </DecorationText>
      {hint && (
        <Wrapper
          $justifyContent={"flex-end"}
          $color={"gray"}
          $fontSize={"16px"}
          $margin={"10px 0 0 0"}
        >
          {hint}
        </Wrapper>
      )}
    </>
  );
}
