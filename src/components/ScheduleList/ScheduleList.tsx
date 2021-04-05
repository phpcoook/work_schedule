import React from "react";
import { RootStateOrAny, useSelector } from 'react-redux';
import * as _ from "lodash"; 
import ScheduleCard from '../ScheduleCard/ScheduleCard';
import { Row, Col } from 'antd';
import { countObjectLength, filterWorkScheduleByDateRange } from '../../helpers/workSchedule';
import { calendarIcon, workTimeIcon} from '../../assets';

/**
 * Loop through all week days of selected week, map it to 
 * schedule of logged in user.
 * 
 * if there's no schedule display "No Schedule", Otherwise 
 * display schedule through child component
 * 
 * @returns 
 */
const ScheduleList = () => {
  const { weekDays, selectedDate } = useSelector((state: RootStateOrAny) => state.calendar);
  const workSchedules = useSelector((state: RootStateOrAny) => state.workSchedules);
  const currentDate = new Date();

  if(_.isEmpty(weekDays)){
    return null;
  }

  const selectedWeekSchedule = filterWorkScheduleByDateRange(workSchedules, weekDays[0].dateString, weekDays[weekDays.length - 1].dateString);

  let totalWorkHours = 0;
  for (const [, value] of Object.entries(selectedWeekSchedule)) {
    totalWorkHours += value.work_time_seconds ;
  }

  return (
      <div className="Schedule__WeeklyStat">
        <Row justify="space-between" align="middle" className="periodDetails">
            <Col className="stat" span={12}>
                <img src={calendarIcon} alt="calendar"/> <span>Total work days</span>
                <div>{countObjectLength(selectedWeekSchedule)}</div>
            </Col>
            <Col className="stat" span={12}>
                <img src={workTimeIcon} alt="clock"/> <span>Total work hours</span>
                <div>{Math.floor(totalWorkHours/60/60)}</div>
            </Col>
        </Row>
        {weekDays.map((weekDay: weekDay, index: number) => {
            let activeClass = weekDay.dateString === selectedDate ? "active" : '';
            let currentDay = weekDay.date === currentDate.getDate() ? "currentDay" : '';
            return (
                <ScheduleCard
                  weekDay={weekDay} 
                  activeClass={activeClass} 
                  currentDay={currentDay} 
                  key={index} 
                  workSchedules={workSchedules}
                />
            );
          })}
      </div>
  );
};

export default ScheduleList;