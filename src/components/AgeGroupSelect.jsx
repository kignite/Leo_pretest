import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import { CommonSelect, DecorationText, Wrapper } from "../css/common";

export default function AgeGroupSelect(props) {
  const { index, ageGroup, updateAgeGroup, isAgeOverLap, getNumberIntervals } =
    props;
  const originArr = Array.from({ length: 21 }, (_, index) => index);
  const [ages, setAges] = useState(ageGroup || [0, 20]);
  const [error, setError] = useState(null);
  const [selectStartAge, setStartSelectAge] = useState(0);
  const [selectEndAge, setSelectEndAge] = useState(20);

  const [numberIntervals, setNumberIntervals] = useState({
    startAgeArr: Array.from({ length: 21 }, (_, index) => index),
    endAgeArr: Array.from({ length: 21 }, (_, index) => index),
    overlap: [],
    notInclude: originArr,
  });

  const handleSelectChange = (ageIndex, e, position) => {
    const { value } = e.target;
    const newAges = [...ages];
    newAges[ageIndex] = value !== "" ? parseInt(value) : null;

    setAges(newAges);

    updateAgeGroup(index, { ageGroup: newAges });

    if (position === "start") {
      setStartSelectAge(value);
      const tmpInd = numberIntervals.startAgeArr.length - 1;
      handleAgeCanSelect(parseInt(value), numberIntervals.startAgeArr[tmpInd]);
    } else if (position === "end") {
      setSelectEndAge(value);
      handleAgeCanSelect(numberIntervals.endAgeArr[0], parseInt(value));
    }
  };

  const handleAgeCanSelect = (startAge, endAge) => {
    let startAgeRange = [0, endAge];
    let endAgeRange = [startAge, 20];

    const startAgeArr = Array.from(
      { length: startAgeRange[1] - startAgeRange[0] + 1 },
      (_, index) => index
    );
    const endAgeArr = Array.from(
      { length: endAgeRange[1] - endAgeRange[0] + 1 },
      (_, index) => index + startAge
    );

    setNumberIntervals({ ...numberIntervals, startAgeArr, endAgeArr });
  };

  const validation = () => {
    setError(null);

    getNumberIntervals();
    if (isAgeOverLap) {
      setError("年齡區段不可重疊");
    }
  };

  // useEffect(() => {
  //   handleAgeCanSelect(0, 20);
  // }, []);

  useEffect(() => {
    validation();
  }, [ages, isAgeOverLap]);

  return (
    <Wrapper $direction={"column"} $width={"50%"}>
      <Wrapper $color={"gray"} $fontSize={"16px"}>
        年齡
      </Wrapper>
      <Wrapper $margin={"20px 0 0 0"}>
        <CommonSelect
          $borderRadius={"5px 0 0 5px"}
          onChange={(e) => handleSelectChange(0, e, "start")}
          value={selectStartAge}
          defaultValue={selectStartAge}
        >
          {numberIntervals?.startAgeArr.map((age) => {
            return <option value={age}>{age}</option>;
          })}
        </CommonSelect>
        <DecorationText
          $bgColor={"#FCFCFC"}
          $border={"1px solid #9D9D9D"}
          $color={"#9D9D9D"}
          $padding={"0 10px"}
          $alignItems={"center"}
          $fontSize={"15px"}
        >
          ~
        </DecorationText>
        <CommonSelect
          $borderRadius={"0 5px 5px 0"}
          onChange={(e) => handleSelectChange(1, e, "end")}
          value={selectEndAge}
          defaultValue={selectEndAge}
        >
          {numberIntervals?.endAgeArr.map((age) => {
            return <option value={age}>{age}</option>;
          })}
        </CommonSelect>
      </Wrapper>
      {error && <Alert error={error} />}
    </Wrapper>
  );
}