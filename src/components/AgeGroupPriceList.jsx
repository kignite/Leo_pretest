import React, { useState } from "react";
import AgeGroup from "./AgeGroup";
import {
  AddBtn,
  Container,
  DividerLine,
  RemoveBtn,
  Wrapper,
} from "../css/common";

export default function AgeGroupPriceList(props) {
  const { propsOnChange } = props;
  const [ageGroups, setAgeGroups] = useState([
    { id: 0, ageGroup: [0, 20], price: null },
  ]);
  const [isAgeOverLap, setIsAgeOverLap] = useState(false);
  const [isDisableAdd, setIsDisableAdd] = useState(false);

  const addAgeGroup = () => {
    const newId = ageGroups.length;
    setAgeGroups([...ageGroups, { id: newId, ageGroup: [0, 20], price: null }]);
  };

  const removeAgeGroup = (id) => {
    const updatedGroups = ageGroups.filter((group) => group.id !== id);
    const renumberedGroups = updatedGroups.map((group, index) => ({
      ...group,
      id: index,
    }));
    setAgeGroups(renumberedGroups);
  };

  const updateAgeGroup = (index, newData) => {
    const updatedAgeGroups = [...ageGroups];
    updatedAgeGroups[index] = { ...updatedAgeGroups[index], ...newData };
    setAgeGroups(updatedAgeGroups);

    // to show the result
    console.log(propsOnChange(updatedAgeGroups, showThePropsOnChange));
  };

  const showThePropsOnChange = (results) => {
    return results.map(({ id, ...result }) => result);
  };

  const getNumberIntervals = () => {
    setIsAgeOverLap(false);
    setIsDisableAdd(false);

    const rangesArr = ageGroups
      .filter(({ ageGroup }) => ageGroup)
      .map(({ ageGroup }) => ageGroup);

    rangesArr.sort((a, b) => a[0] - b[0]);

    const overlap = mergeIntervals(handleOverlapIntervals(rangesArr));
    const notInclude = handleNotIncludeIntervals(rangesArr);

    if (overlap.length > 0) {
      setIsAgeOverLap(true);
    }
    if (
      notInclude.length === 0 ||
      (notInclude.length === 1 &&
        notInclude[0][0] === 0 &&
        notInclude[0][1] === 20)
    ) {
      setIsDisableAdd(true);
    }

    return { overlap, notInclude };
  };

  const handleNotIncludeIntervals = (intervals) => {
    //except step
    //[[5, 8], [6, 11], [7, 7], [14, 17], [17, 20]]=>
    //[0, 1, 2, 3, 4, 12, 13] =>
    //[[0, 4], [12, 13]]

    let output = [];
    let allNumbers = new Set();

    // 遍歷每個區間，同時將所有數字存入 Set 中
    intervals.forEach((interval) => {
      let min = interval[0];
      let max = interval[1];
      for (let i = min; i <= max; i++) {
        allNumbers.add(i);
      }
    });

    // 遍歷 0 到 20 的所有數字，找出未包含的數字區間
    let min = null;
    for (let i = 0; i <= 20; i++) {
      if (allNumbers.has(i)) {
        if (min !== null) {
          output.push([min, i - 1]);
          min = null;
        }
      } else {
        if (min === null) {
          min = i;
        }
      }
    }

    // 添加最後一個未包含的數字區間（如果有的話）
    if (min !== null) {
      output.push([min, 20]);
    }

    return output;
  };

  const handleOverlapIntervals = (intervals) => {
    //except step
    //[[5, 8], [6, 11], [7, 7], [14, 17], [17, 20]]=>
    //[[6, 8], [7,7], [17,17]]

    const overlapIntervals = [];

    for (let i = 0; i < intervals.length - 1; i++) {
      const [start1, end1] = intervals[i];
      const [start2, end2] = intervals[i + 1];
      if (end1 >= start2) {
        overlapIntervals.push([start2, Math.min(end1, end2)]);
      }
    }

    return overlapIntervals;
  };

  const mergeIntervals = (intervals) => {
    // except step
    // [[6, 8], [7, 7], [17, 17]] =>
    // [[6, 8], [17, 17]]

    if (intervals.length <= 1) {
      return intervals;
    }
    // 對輸入數組按照起始位置排序
    intervals.sort((a, b) => a[0] - b[0]);
    const mergedIntervals = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
      const currentInterval = intervals[i];
      const lastMergedInterval = mergedIntervals[mergedIntervals.length - 1];

      if (currentInterval[0] <= lastMergedInterval[1]) {
        // 存在重疊，更新合併後的區間的结束位置
        lastMergedInterval[1] = Math.max(
          lastMergedInterval[1],
          currentInterval[1]
        );
      } else {
        // 不存在重疊，添加新的合併區間
        mergedIntervals.push(currentInterval);
      }
    }

    return mergedIntervals;
  };

  return (
    <Container>
      {ageGroups.map((group, index) => (
        <Wrapper
          $gap={"20px"}
          $direction={"column"}
          $position={"relative"}
          $width={"100%"}
          key={group.id}
        >
          {ageGroups.length > 1 && index !== 0 && (
            <RemoveBtn onClick={() => removeAgeGroup(group.id)}>
              X移除
            </RemoveBtn>
          )}
          <AgeGroup
            key={group.id}
            index={index}
            ageGroup={group.ageGroup}
            price={group.price}
            updateAgeGroup={updateAgeGroup}
            isAgeOverLap={isAgeOverLap}
            getNumberIntervals={getNumberIntervals}
          />
          {index !== ageGroups.length - 1 && <DividerLine $bgColor={"gray"} />}
        </Wrapper>
      ))}
      {isDisableAdd ? (
        <AddBtn onClick={addAgeGroup} disabled $disabled={true}>
          +新增價格設定
        </AddBtn>
      ) : (
        <AddBtn onClick={addAgeGroup}>+新增價格設定</AddBtn>
      )}
    </Container>
  );
}
