import React, { useState } from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
import { units } from '../../../constants/calendar';
import { inTheOfficeIcon, deleteIcon } from '../../../assets';
const { RangePicker } = TimePicker;

/**
 * Component to add/edit/view/delete work shifts through timepicker,
 * used ant design's time range picker which calls handleOnChangeShift
 * function when start_time/end_time gets changed.
 * 
 * Currently minutes and seconds inputs are disabled, only hours can be 
 * selected.
 * 
 * we have used onOpenChange prop of Rangepicker to remove foucs after selecting 
 * time range.
 * 
 * @typedef {object} WorkShift
 * 
 * @prop {number} index
 * @prop {start_time} string
 * @prop {end_time} string
 * @prop {()=>void} [handleOnChangeShift]
 * @prop {()=>void} [handleOnDeleteWorkShifts]
 * 
 * @returns 
 */

const WorkShift = (props: WorkShift) => {
    const {
        index,
        handleOnChangeShift,
        start_time,
        end_time,
        handleOnDeleteWorkShifts
    } = props;
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);

    /**
     * Stop event propogation to parent divs and calls
     * handleOnDeleteWorkShifts function of parent component
     * 
     * @event deleteIcon#click 
     */    
    const handleOnDelete = (e: any) => {
        e.stopPropagation();
        handleOnDeleteWorkShifts(index);
    };

    return (
        <div
            className="editableSchedule"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setShowDeleteIcon(true)}
            onMouseLeave={() => setShowDeleteIcon(false)}
        >
            <img
                src={inTheOfficeIcon}
                alt="work shift"
                className="scheduleIcon"
            />
            <RangePicker
                bordered={false}
                value={[
                    moment(start_time, 'HH:mm:ss'),
                    moment(end_time, 'HH:mm:ss')
                ]}
                allowClear={false}
                suffixIcon={null}
                onChange={async (dates, dateStrings) => {
                    await handleOnChangeShift(
                        index,
                        dateStrings[0],
                        dateStrings[1]
                    );
                }}
                separator=" - "
                disabledMinutes={() => units}
                disabledSeconds={() => units}
                inputReadOnly={true}
                onOpenChange={(open) => {
                    if (!open) {
                        var element: any = document.getElementsByClassName(
                            'ant-picker-focused'
                        );
                        if (!!element) {
                            element[0].classList.remove('ant-picker-focused');
                        }
                    }
                }}
            />
            {!!showDeleteIcon && (
                <span>
                    <img
                        src={deleteIcon}
                        alt="comment"
                        className="deleteIcon"
                        onClick={handleOnDelete}
                    />
                </span>
            )}
        </div>
    );
};

export default WorkShift;
