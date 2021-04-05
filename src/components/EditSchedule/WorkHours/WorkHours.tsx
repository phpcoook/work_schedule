import React, { useState, useRef } from 'react';
import { workTimeIcon, deleteIcon } from '../../../assets';


/**
 * 
 * Component to edit/delete/view work hours for schedule 
 * 
 * @typedef {object} WorkHours
 * 
 * @prop {number} hours
 * @prop {()=>void} [handleOnChange]
 * @prop {()=>void} [handleOnSubmit]
 * @prop {()=>void} [handleOnDeleteWorkHours]
 * 
 * @returns 
 */
const WorkHours = (props: WorkHours) => {
    const {
        handleOnChange,
        hours,
        handleOnSubmit,
        handleOnDeleteWorkHours
    } = props;
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const inputEl = useRef<HTMLInputElement>(null);

    /**
     * Save the edited workhours on enter key press
     * Disable the edit modes
     * 
     * @event scheduleIcon.input#keypress
     */
    const handleOnSave = (e: any) => {
        if (e.key === 'Enter') {
            setEditing(false);
            handleOnSubmit();
        }
    };

    /**
     * Stop event propogation, Focus on work hour input on 
     * editableHours div click, enable edit mode for work
     * hours
     * 
     * @event editableHours#click
     */
    const handleOnClick = async (e: any) => {
        e.stopPropagation();
        await setEditing(true);
        if (inputEl && inputEl.current) {
            inputEl.current.focus();
        }
    };

    /**
     * Stop event propogation to parent divs and calls
     * handleOnDeleteWorkHours function of parent component
     * 
     * @event deleteIcon#click 
     */
    const handleOnDelete = (e: any) => {
        e.stopPropagation();
        handleOnDeleteWorkHours();
    };

    return (
        <div
            className="editableHours"
            onClick={handleOnClick}
            onMouseEnter={() => setShowDeleteIcon(true)}
            onMouseLeave={() => setShowDeleteIcon(false)}
        >
            <img src={workTimeIcon} alt="work hours" className="scheduleIcon" />
            {isEditing ? (
                <span>
                    <input
                        type="text"
                        onChange={(e) => handleOnChange(e)}
                        ref={inputEl}
                        onKeyPress={handleOnSave}
                        maxLength={2}
                        onBlur={() => setEditing(false)}
                        value={hours}
                    />{' '}
                    :00
                </span>
            ) : (
                <span>{hours || '0'}h</span>
            )}
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

export default WorkHours;
