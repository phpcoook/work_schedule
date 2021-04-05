import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { Row } from "antd";
import UserSchedule from "../UserSchedule/UserSchedule";
import * as _ from "lodash";
import { timeInterval } from "../../constants/calendar";
import moment from 'moment';

/**
 * Fetched all users, work schedules, week days of selected week
 * and displays schedule of all users sorted in alphabetical order
 * with loggedin user's schedule being at the top and fixed.
 * 
 * @returns 
 */
const TeamWorkSchedule = () => {
  const users = useSelector((state: RootStateOrAny) => state.users);
  const workSchedules = useSelector((state: RootStateOrAny) => state.workSchedules);
  const { selectedDate } = useSelector((state: RootStateOrAny) => state.calendar);
  
  /**
   * Filters the schedule of all users for currently selected date
   */
  const selectedDayWorkSchedule = _.filter(workSchedules ,{ 'date' : selectedDate });

  if (_.isEmpty(users) && !!selectedDate) {
    return null;
  }

  /**
   * Find the details of logged in user
   */
  let loggedInUser = _.find(users, { id: 1 });

  /**
   * Find the schedule of logged in user for currently selected date
   */
  let loggedInUserWorkSchedule = _.find(selectedDayWorkSchedule, {
    user_id: 1,
  });

  /**
   * Sort users by their first name
   */
  const sortedUsers = _.sortBy(users, ["first_name"]);
  return (
    <div className="TeamWork_Schedule">
      <Row className="Schedule__Filter Teamwork__Head" align="middle">
        <h4>{moment(selectedDate).format("dddd, MMMM D")}</h4>
      </Row>
      <div className="TeamWork_Schedule_Panel">
        <div className="Current__User__Schedule__Panel">
          <div className="userWorkSchedule">
            <div className="userSearchFilter">
              <input type="text" placeholder="Search" disabled={true} />
            </div>
            <div className="timeFrameInterval">
              {timeInterval.map((value, index) => {
                return (
                  <>
                    <div>{value}</div>
                    <div></div>
                  </>
                );
              })}
            </div>
          </div>
          <UserSchedule
            {...loggedInUser}
            workSchedule={loggedInUserWorkSchedule}
            selectedDate={selectedDate}
            key={0}
          />
          <div className="divider"></div>
        </div>
        <div className="Team__Schedule_Panel">
          {sortedUsers.map((user: User, index: number) => {
            if (user.id !== loggedInUser.id) {
              let workSchedule = _.find(selectedDayWorkSchedule, {
                user_id: user.id,
              });
              return (
                <UserSchedule
                  {...user}
                  key={index}
                  workSchedule={workSchedule}
                  selectedDate={selectedDate}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamWorkSchedule;
