import React from 'react';
import { Popover } from 'antd';
import { useDispatch } from 'react-redux';
import { RootStateOrAny, useSelector } from 'react-redux';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { updateWorkSchedule } from '../../../actions/workSchedules';
import { moreActionsIcon } from '../../../assets';

/**
 * Displays the option to add new schedule/new work shift in
 * tooltip.
 * 
 * Check if there's already a schedule for date, if yes then display
 * option to add new work shift, otherwise dispay option to add 
 * new schedule
 * 
 * @typedef {object} EditOptions
 * 
 * @param {string} date
 * @param {Object} userWorkSchedule
 * @returns 
 */

const EditOptions = (props: EditOptions) => {
    const { date, userWorkSchedule, handleSetEditing } = props;
    const isScheduleExists = !_.isEmpty(userWorkSchedule);
    let work_time_seconds = 0;
    let comment = '';
    let shifts: any = [];

    if(!!isScheduleExists){
        work_time_seconds = userWorkSchedule[0].work_time_seconds;
        comment = userWorkSchedule[0].comment;
        shifts = userWorkSchedule[0].shifts;
    }

    const workSchedules = useSelector(
        (state: RootStateOrAny) => state.workSchedules
    );
    const dispatch = useDispatch();

    /**
     * checks if schedule exists for given date, 
     * 
     * If not add schedule with default shift and work hours 
     * and dispatch it to redux store.
     * 
     * If yes, then add work shift to existing schedule for
     * the date passed and dispatch it to redux store.
     * 
     * @param {string} date 
     */    
    const addSchedule = (date: string) => {
        const workSchedulesCopy = [...workSchedules];
        let editedSchedule;
        if (!!isScheduleExists && (!!work_time_seconds || !!comment || shifts.length > 0)) {
            let shifts = [
                ...userWorkSchedule[0].shifts,
                {
                    start_time: '09:00:00',
                    end_time: '17:00:00'
                }
            ];

            editedSchedule = workSchedulesCopy.map((item, index) => {
                if (item.id === userWorkSchedule[0].id) {
                    return {
                        ...item,
                        shifts
                    };
                } else {
                    return {
                        ...item
                    };
                }
            });
        } else {
            let ws = {
                id: uuidv4(),
                user_id: 1,
                date,
                shifts: [
                    {
                        start_time: '09:00:00',
                        end_time: '17:00:00'
                    }
                ],
                work_time_seconds: 28800,
                comment: 'Default Schedule'
            };
            editedSchedule = [...workSchedulesCopy, ws];
        }
        dispatch(updateWorkSchedule(editedSchedule));
        handleSetEditing();
    };

    /**
     * Remove schedule and dispatch to redux store.
     */
    const clearSchedule = () => {
        const workSchedulesCopy = [...workSchedules];
        let editedSchedule = _.remove(workSchedulesCopy, function (item) {
            return item.id !== userWorkSchedule[0].id;
        });
        dispatch(updateWorkSchedule(editedSchedule));
    };

    const handleAddSchedule = () => {
        addSchedule(date);
    };

    const handleClearSchedule = () => {
        clearSchedule();
    };

    const content = (
        <div className="editOptionsDropdown">
            <p onClick={handleAddSchedule}>
                {!!isScheduleExists && (!!work_time_seconds || !!comment) ? 'Add new work shift' : 'Add schedule'}
            </p>
            <p onClick={handleClearSchedule}>No schedule</p>
        </div>
    );

    return (
        <div>
            <Popover placement="bottomRight" content={content} trigger="click">
                <img
                    src={moreActionsIcon}
                    className="moreIcon"
                    alt="Edit Options"
                    onClick={(e) => e.stopPropagation()}
                />
            </Popover>
        </div>
    );
};

export default EditOptions;
