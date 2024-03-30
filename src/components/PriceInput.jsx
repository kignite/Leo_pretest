import React, { useState } from "react";
import Alert from "./Alert";
import { CommonInput, DecorationText, Wrapper } from "../css/common";

const currency = "TWD";

export default function PriceInput(props) {
  const { index, price, updateAgeGroup } = props;
  const [num, setNum] = useState(price || "");

  const handleInputChange = (e) => {
    const { value } = e.target;
    const strippedValue = value.replace(/[^0-9.-]|(?<=.)-/g, "");

    updateAgeGroup(index, { price: parseFloat(strippedValue) });

    const parts = strippedValue.split(".");
    const integerPart = addComma(parts[0]);
    const formattedValue =
      parts.length > 1 ? integerPart + "." + parts[1] : integerPart;
    setNum(formattedValue);
  };

  const addComma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Wrapper $direction={"column"} $width={"50%"}>
      <Wrapper $color={"gray"} $fontSize={"16px"}>
        入住費用(每人每晚)
      </Wrapper>
      <Wrapper $margin={"20px 0 0 0"} $RWD={true}>
        <DecorationText
          $bgColor={"#FCFCFC"}
          $border={"1px solid #9D9D9D"}
          $color={"#9D9D9D"}
          $padding={"0 10px"}
          $borderRadius={"4px 0 0 4px"}
          $alignItems={"center"}
          $fontSize={"15px"}
        >
          {currency}
        </DecorationText>
        <CommonInput
          $borderRadius={"0 4px 4px 0"}
          onChange={handleInputChange}
          value={num}
          type="text"
          placeholder="請輸入費用"
        ></CommonInput>
      </Wrapper>
      {num.length === 0 && (
        <Alert error={"不可以空白"} hint={"輸入 0 表示免費"} />
      )}
    </Wrapper>
  );
}
