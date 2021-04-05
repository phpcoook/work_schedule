import React, { useState } from 'react';
import * as _ from 'lodash';
import WorkHours from '../../EditSchedule/WorkHours/WorkHours';
import WorkShift from '../../EditSchedule/WorkShifts/WorkShifts';
import Comment from '../../EditSchedule/Comment/Comment';
import moment from 'moment';

/**
 * Wrapper component for child components (i.e Comment, Workhours and Workshifts),
 * the actual logic to save the edited fields of schedule and change log resides 
 * here.
 * 
 * @typedef {object} DaySchedules
 * 
 * @prop {object} daySchedule
 * @prop {()=>void} [updateSchedule]
 * @prop {()=>void} [updateLog]
 * 
 * @returns 
 */

const DaySchedule = (props: DaySchedules) => {
    const { daySchedule, updateSchedule, updateLog, editing , editHours, editComment , handleSetEditComment, handleSetEditHours} = props;

    const schedule = _.head(daySchedule);
    const date = schedule?.date;
    const workTimeSeconds : any = schedule?.work_time_seconds;
    const shifts = schedule?.shifts;
    const cmnt = schedule?.comment;
    const id = schedule?.id;

    /**
     * these are the common change log params while storing
     * the change log for any schedule
     */
    let defaultEditLogParam = {
        work_time_id: id,
        modifier_user_id: 1,
        change_datetime: moment().format('Y-MM-D H:m:s'),
        change_type_enum: 'update'
    };

    
    const [hours, setHours] = useState(0);
    const [workShifts, setWorkShits] = useState([]);
    const [comment, setComment] = useState('');
    const [editLog, setEditLog] = useState({});
    
    React.useEffect(
        () =>
            setHours(
                !!workTimeSeconds ? Math.floor(workTimeSeconds / 60 / 60) : 0
            ),
        [workTimeSeconds]
    );
    React.useEffect(() => setWorkShits(!!shifts ? shifts : []), [shifts]);
    React.useEffect(() => setComment(!!cmnt ? cmnt : ''), [cmnt]);

    /**
     * This function gets called from WorkHours, when the work hours of schedule
     * gets changed then it stores the change log and hours to state 
     * 
     * @event editableHours>input#change
     */
    const handleOnChange = (e: any) => {
        if (e.target.value >= 0 && e.target.value <= 24) {
            let editLog = {
                ...defaultEditLogParam,
                work_time_seconds_before: Math.floor(workTimeSeconds),
                work_time_seconds_after: Math.floor(e.target.value * 60 * 60)
            };
            console.log(editLog);
            setEditLog(editLog);
            setHours(e.target.value);
        } else {
            e.current.value(hours);
        }
    };


    /**
     * This function gets called from WorkShift component, when the work shift is added/edited then this function 
     * gets called, dispatch the editlog and new workshift to redux store. 
     * 
     * @event editableSchedule>RangePicker#change
     */
    const handleOnChangeShift = (
        index: number,
        start_time: string,
        end_time: string
    ) => {
        const ws: any = [...shifts];
        const shift_before = ws[index];
        const shift_after = {
            start_time,
            end_time
        };
        ws[index] = shift_after;

        let editLog = {
            ...defaultEditLogParam,
            start_datetime_before: date+' '+shift_before.start_time,
            end_datetime_before: date+' '+shift_before.end_time,
            start_datetime_after: date+' '+shift_after.start_time,
            end_datetime_after: date+' '+shift_after.end_time
        };

        /**
         * this function dispatchs the updated schedule to redux store
         */
        updateSchedule(
            {
                work_time_seconds: Math.floor(hours * 60 * 60),
                comment,
                shifts: ws
            },
            id
        );

        /**
         * this function dispatchs the updated change log to redux store
         */
        updateLog(editLog);
    };


    /**
     * This function gets called from Comment component, when comment for schedule
     * gets changed, it stores the change log and edited comment to local state.
     * 
     * @event editableComment>input#change 
     */
    const handleOnCommentChange = async (e: any) => {
        let editLog = {
            ...defaultEditLogParam,
            comment_before: cmnt,
            comment_after: e.target.value
        };
        setEditLog(editLog);
        setComment(e.target.value);
    };

    /**
     * This function gets called from Comment and WorkHours component on enter key press,
     * it dispatchs the local state (i.e. updated schedule and change log) to redux
     * store
     * 
     */
    const handleOnSubmit = () => {
        updateSchedule(
            {
                work_time_seconds: Math.floor(hours * 60 * 60),
                comment,
                shifts: workShifts
            },
            id
        );
        updateLog(editLog);
    };
    
    /**
     * This function gets called from WorkHours component, it sets 
     * the hours to 0 and dispatch updated schedule to redux store
     * 
     */
    const handleOnDeleteWorkHours = () => {
        updateSchedule(
            {
                work_time_seconds: 0,
                comment,
                shifts: workShifts
            },
            id
        );
        handleSetEditHours(false);
    };

    /**
     * This function gets called from WorkShifts component, it receives the index 
     * of the shift from multiple shifts to be deleted, update work shift of
     * schedule accordingly and dispatch to redux store.
     * 
     * @param {number} index
     * 
     */
    const handleOnDeleteWorkShifts = (index: number) => {
        let ws = _.remove([...workShifts], function (item, key) {
            return key !== index;
        });

        updateSchedule(
            {
                work_time_seconds: Math.floor(hours * 60 * 60),
                comment,
                shifts: ws
            },
            id
        );
    };

    /**
     * This function gets called from Comment component, it clears the comment
     * of schedule, dispatch updated schedule to redux store.
     * 
     */
    const handleOnDeleteComment = () => {
        updateSchedule(
            {
                work_time_seconds: Math.floor(hours * 60 * 60),
                comment: '',
                shifts: workShifts
            },
            id
        );
        handleSetEditComment(false);
    };

    return (
        <div className="editView">
        {!!workTimeSeconds || !!cmnt || shifts.length > 0 || editing ? (
            <>
                {(!!workTimeSeconds || editHours)  && (
                    <WorkHours
                        handleOnChange={handleOnChange}
                        hours={hours}
                        handleOnSubmit={handleOnSubmit}
                        handleOnDeleteWorkHours={handleOnDeleteWorkHours}
                    />
                )}
                {!!shifts &&
                    shifts.map((shift: Shift, index: number) => {
                        return (
                            <WorkShift
                                key={index}
                                start_time={shift.start_time}
                                end_time={shift.end_time}
                                index={index}
                                handleOnChangeShift={handleOnChangeShift}
                                handleOnDeleteWorkShifts={handleOnDeleteWorkShifts}
                            />
                        );
                    })}
                {(!!comment || editComment)  && (    
                    <Comment
                        comment={comment}
                        handleOnCommentChange={handleOnCommentChange}
                        handleOnSubmit={handleOnSubmit}
                        handleOnDeleteComment={handleOnDeleteComment}
                    />
                )}
            </>
        ) : (
            <div className="noScheduleInner">
                <div>No Schedule</div>
            </div>
        )}
        </div>
    );
};

export default DaySchedule;
