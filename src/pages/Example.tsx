import React, { useState, useRef } from "react";
import ScheduleSelector from "react-schedule-selector";
import { format, addDays, subDays } from "date-fns";

interface CustomScheduleComponentProps {}

const CustomScheduleComponent: React.FC<CustomScheduleComponentProps> = () => {
  const [schedule, setSchedule] = useState<Date[]>([]);


  const handleChange = (newSchedule: Date[]) => {
    setSchedule(newSchedule);
  };

  const renderCustomCell = (
    time: Date,
    selected: boolean,
    refSetter: (node: HTMLElement | null) => void
  ): JSX.Element => (
    <div
      ref={(node) => refSetter(node)} // RefSetter에 넘길 때 null을 처리할 수 있도록 설정
      style={{
        backgroundColor: selected
          ? "rgba(128, 0, 128, 0.8)"
          : "rgba(200, 200, 255, 0.6)",
        border: "1px solid #ddd",
        height: "100%",
        width: "100%",
      }}
    />
  );

  const renderDateLabel = (date: Date): JSX.Element => (
    <div style={{ padding: "4px", fontWeight: "bold" }}>
      {format(date, "EEE M/d")}
    </div>
  );

  

  return (
    <div>
      <ScheduleSelector
        selection={schedule}
     
        numDays={7}
        minTime={8}
        maxTime={20}
        hourlyChunks={2} // 30분 간격으로 설정
        onChange={handleChange}
        columnGap="0px" // 셀 간의 간격을 0으로 설정
        rowGap="0px" // 셀 간의 간격을 0으로 설정
        renderDateLabel={renderDateLabel} // 요일 + 날짜 출력
      />
    </div>
  );
};

export default CustomScheduleComponent;
