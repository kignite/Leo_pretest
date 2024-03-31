import { Wrapper } from "../css/common";
import AgeGroupSelect from "./AgeGroupSelect";
import PriceInput from "./PriceInput";

export default function AgeGroup(props) {
  const {
    index,
    price,
    ageGroup,
    updateAgeGroup,
    isAgeOverLap,
    getNumberIntervals,
    minAge,
    maxAge,
  } = props;
  return (
    <>
      <div>價格設定 - {index + 1}</div>
      <Wrapper
        $justifyContent={"space-around"}
        $gap={"30px"}
        $width={"100%"}
        $RWD={"wrap"}
      >
        <AgeGroupSelect
          index={index}
          ageGroup={ageGroup}
          updateAgeGroup={updateAgeGroup}
          isAgeOverLap={isAgeOverLap}
          getNumberIntervals={getNumberIntervals}
          minAge={minAge}
          maxAge={maxAge}
        />
        <PriceInput
          index={index}
          price={price}
          updateAgeGroup={updateAgeGroup}
        />
      </Wrapper>
    </>
  );
}
