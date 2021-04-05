import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import * as _ from 'lodash';
import { secondsToHms } from '../../../helpers/dateUtils';
import moment from 'moment';

/**
 * Loop through all the logs received via prop, and displays it
 * with formatting date/time fields redable string using moment 
 * 
 * @typedef {object} InfoBox
 * 
 * @param {object} log
 * @returns 
 */

const InfoBox = (props: InfoBox) => {
    const changeLogs = props.log;
    return (
        <div className="toolTipBox">
            {changeLogs.map((log: changeLog, index: number) => {
                const {
                    change_datetime,
                    work_time_seconds_before,
                    work_time_seconds_after,
                    start_datetime_before,
                    end_datetime_before,
                    start_datetime_after,
                    end_datetime_after,
                    comment_before,
                    comment_after
                } = log;

                return (
                    <div key={index}>
                        <p className="changedTime">
                            {moment(change_datetime).format('dddd D, HH:mm')}
                        </p>
                        {!!work_time_seconds_before && (
                            <p>
                                Work time was changed from{' '}
                                <span className="tx-green">
                                    {secondsToHms(work_time_seconds_before)}
                                </span>{' '}
                                to{' '}
                                <span className="tx-green">
                                    {secondsToHms(work_time_seconds_after)}
                                </span>
                            </p>
                        )}
                        {!!start_datetime_before && (
                            <p>
                                In the office was changed from{' '}
                                <span className="tx-green">
                                    {moment(start_datetime_before).format(
                                        'HH:mm'
                                    )}
                                </span>{' '}
                                -{' '}
                                <span className="tx-green">
                                    {moment(end_datetime_before).format(
                                        'HH:mm'
                                    )}
                                </span>{' '}
                                to{' '}
                                <span className="tx-green">
                                    {moment(start_datetime_after).format(
                                        'HH:mm'
                                    )}
                                </span>{' '}
                                -{' '}
                                <span className="tx-green">
                                    {moment(end_datetime_after).format('HH:mm')}
                                </span>
                            </p>
                        )}
                        {!!comment_before && (
                            <p>
                                Comment was changed from{' '}
                                <span className="tx-green">
                                    {comment_before}
                                </span>{' '}
                                to{' '}
                                <span className="tx-green">
                                    {comment_after}
                                </span>
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

/**
 * Filters the changed log based on received id as prop
 * and display it in tooltip
 * 
 * @typedef {object} ChangeLog
 * 
 * @param {number} id 
 * @returns 
 */
const ChangeLog = (props: ChangeLog) => {
    const changeLogs = useSelector((state: RootStateOrAny) => state.changeLogs);
    const changeLog = _.filter(changeLogs, { work_time_id: props.id});

    if (_.isEmpty(changeLog)) {
        return null;
    }

    return (
        <Tooltip
            placement="topRight"
            title={<InfoBox log={changeLog} />}
            color="#000"
        >
            <div className="edited">Edited</div>
        </Tooltip>
    );
};

export default ChangeLog;
