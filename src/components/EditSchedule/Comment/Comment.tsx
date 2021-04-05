import React, { useRef, useState } from 'react';
import { commentIcon, deleteIcon } from '../../../assets';

/**
 * Component to edit/delete/view comment for schedule 
 * 
 * @typedef {object} CommentProps
 * 
 * @prop {string} comment
 * @prop {()=>void} [handleOnCommentChange]
 * @prop {()=>void} [handleOnDeleteComment]
 * @prop {()=>void} [handleOnSave]
 * 
 * @returns 
 */
const Comment = (props: CommentProps) => {
    const {
        handleOnCommentChange,
        comment,
        handleOnSubmit,
        handleOnDeleteComment
    } = props;
    const inputEl = useRef<HTMLInputElement>(null);
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);


    /**
     * Save the edited comment on enter key press and
     * remove focus
     * 
     * @event scheduleIcon.input#keypress
     */
    const handleOnSave = (e: any) => {
        if (e.key === 'Enter') {
            handleOnSubmit();
            if (inputEl && inputEl.current) {
                inputEl.current.blur();
            }
        }
    };

    /**
     * Focus on comment input on editableComment div click 
     * 
     * @event editableComment#click
     */
    const handleOnClick = async (e: any) => {
        e.stopPropagation();
        if (inputEl && inputEl.current) {
            inputEl.current.focus();
        }
    };

    /**
     * Stop event propogation to parent divs and calls
     * handleOnDeleteComment function of parent component
     * 
     * @event deleteIcon#click 
     */
    const handleOnDelete = (e: any) => {
        e.stopPropagation();
        handleOnDeleteComment();
    };

    return (
        <div
            className="editableComment"
            onClick={handleOnClick}
            onMouseEnter={() => setShowDeleteIcon(true)}
            onMouseLeave={() => setShowDeleteIcon(false)}
        >
            <img src={commentIcon} alt="comment" className="scheduleIcon" />
            <span>
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => handleOnCommentChange(e)}
                    onKeyPress={handleOnSave}
                    placeholder="Enter comment"
                    ref={inputEl}
                />
            </span>
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

export default Comment;
