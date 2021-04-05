import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { Button, Row, Col } from 'antd';
import Dropdown from './Dropdown/Dropdown';
import { fetchWeekDays} from "../../actions/calendar";
import { leftArrowIcon, rightArrowIcon, settingsIcon} from '../../assets';

/**
 * Component to display "Next/Previous Week" option and dropdown the select 
 * current. next and last week.
 * 
 * Dispatch the week days to redux store on any of the option change
 * 
 * @returns 
 */
const ScheduleControls = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());

  /**
   * Add/Substract 7 days in local date state based on received
   * order and date.
   * 
   * @param {string} order 
   * @param {Date} date 
   */
  const changeWeek = (order : string, date : Date = new Date()) => {
    let seconds;
    order === 'current' ? seconds = 0 : seconds = 7 * 24 * 60 * 60 * 1000;
    order === 'next' ? setDate(new Date(date.getTime() + seconds)) : setDate(new Date(date.getTime() - seconds))
  }

  useEffect(() => {
    dispatch(fetchWeekDays(date));
  }, [dispatch, date]);

  return (
      <Row className="Schedule__Filter" justify="space-between" align="middle">
        <Col span={12} className="controls">
          <Button onClick={() => changeWeek('previous', date)}> 
            <img src={leftArrowIcon} alt="previouse week"/> 
          </Button>
          <Dropdown handleChangeWeek={changeWeek}/>
          <Button onClick={() => changeWeek('next', date)} >
            <img src={rightArrowIcon} alt="next week"/> 
          </Button>
        </Col>
        <Col span={12} className="defaultSchedule">
          <div className="disabled">
            <span className="icon">
              <img src={settingsIcon} alt="Default schedule"/> 
            </span>
            <span className="text">
              Default schedule
            </span>
          </div>
        </Col>
      </Row>
  );
};

export default ScheduleControls;