import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { getLoggedInUserWorkSchedule } from '../../helpers/workSchedule';
import { updateWorkSchedule } from '../../actions/workSchedules';
import DaySchedule from './DaySchedule/DaySchedule';
import EditOptions from './EditOptions/EditOptions';
import ChangeLog from './ChangeLog/ChangeLog';
import * as _ from 'lodash';
import { RootStateOrAny, useSelector } from 'react-redux';
import { updateChangeLog } from '../../actions/changeLog';
import { updateSelectedDay } from '../../actions/calendar';

/**
 * Loop through logged in user's work schedule for all
 * days in selected week, highlight the selected work schedule
 * and current work schedule based on active class and current
 * day prop
 * 
 * 
 * @typedef {object} ScheduleCard
 * 
 * @prop {string} activeClass
 * @prop {Object} weekDay
 * @prop {Object} workSchedules
 * @prop {string} currentDay
 * 
 * @returns 
 */
const ScheduleCard = (props: ScheduleCard) => {
    const dispatch = useDispatch();
    const changeLogs = useSelector((state: RootStateOrAny) => state.changeLogs);
    const { activeClass, weekDay, workSchedules, currentDay } = props;
    const { day, date, dateString } = weekDay;
    const [editing, setEditing ] = useState(false);
    const [editHours, setEditHours ] = useState(false);
    const [editComment, setEditComment ] = useState(false);

    const handleSetEditHours = (hidden : boolean) => {
        setEditHours(hidden);
    }

    const handleSetEditComment = (hidden : boolean) => {
        setEditComment(hidden);
    }

    const handleSetEditing = () => {
        setEditing(true);
        setEditHours(true);
        setEditComment(true);
    }

    /**
     * Funtion to dispatch updated work schedule for 
     * given id to redux store
     * 
     * @param {object} ws 
     * @param {number} id 
     */
    const updateSchedule = (ws: any, id: number) => {
        let workSchedulesCp = [...workSchedules];

        if(!!ws.work_time_seconds || !!ws.comment || ws.shifts.length > 0){
            const editedSchedule = workSchedulesCp.map((item, index) => {
                if (item.id === id) {
                    return {
                        ...item,
                        ...ws
                    };
                } else {
                    return {
                        ...item
                    };
                }
            });
            dispatch(updateWorkSchedule(editedSchedule));
        }else{
            let editedSchedule = _.remove(workSchedulesCp, function (item) {
                return item.id !== id;
            });
            dispatch(updateWorkSchedule(editedSchedule));
        }
        setEditing(false);
    };

    /**
     * Funtion to dispatch updated change log for 
     * schedule to redux store
     * 
     * @param {object} ws 
     * @param {number} id 
     */
    const updateLog = (changeLog: changeLog) => {
        const changeLogsCp = [...changeLogs];
        dispatch(updateChangeLog([...changeLogsCp, changeLog]));
    };

    const user_id = 1;
    const { userWorkSchedule } = getLoggedInUserWorkSchedule(
        workSchedules,
        user_id
    );

    return (
        <Row
            className={`Schedule__Panel ${activeClass}`}
            justify="space-between"
            onClick={() => dispatch(updateSelectedDay(weekDay.dateString))}
        >
            <Col span={1} className={`Schedule__Day ${currentDay}`}>
                <div className="day">{day}</div>
                <div className="date">{date}</div>
            </Col>
            {_.isEmpty(userWorkSchedule[weekDay.dateString]) ? (
                <Col span={18} className="noSchedule">
                    No Schedule
                </Col>
            ) : (
                <Col span={18} offset={2}>
                    <DaySchedule
                        daySchedule={userWorkSchedule[dateString]}
                        updateSchedule={updateSchedule}
                        updateLog={updateLog}
                        editing={editing}
                        editHours={editHours}
                        editComment={editComment}
                        handleSetEditComment={handleSetEditComment}
                        handleSetEditHours={handleSetEditHours}
                    />
                </Col>
            )}
            <Col span={2} className="editOptions">
                <EditOptions
                    date={dateString}
                    userWorkSchedule={userWorkSchedule[dateString]}
                    handleSetEditing={handleSetEditing}
                />
                {!_.isEmpty(userWorkSchedule[dateString]) && (
                    <ChangeLog
                        id={userWorkSchedule[dateString][0].id}
                    />
                )}
            </Col>
        </Row>
    );
};

export default ScheduleCard;
