import React from 'react';
import { Row, Col, Badge, Tooltip } from 'antd';
import { timeLine } from '../../constants/calendar';
import { getTimeIntervalClass } from '../../helpers/workSchedule';
import { commentBlueIcon } from '../../assets';
import _ from 'lodash';
import { secondsToHms } from '../../helpers/dateUtils';

/**
 * Display the schedule of user, highlights the work shifts
 * in time interval row
 * 
 * @typedef {object} User
 * 
 * @prop {obect} workShifts
 * @prop {string} first_name
 * @prop {string} avatar_image
 * @prop {string} selectedDate
 * 
 * @returns 
 */
const UserSchedule = (props: User) => {
    const { workSchedule, first_name, avatar_image, selectedDate } = props;
    var workShifts: any = [];
    var comment: string = '';
    var hours: string = '0h 00m';
    if (!_.isEmpty(workSchedule)) {
        workShifts = workSchedule.shifts;
        comment = workSchedule.comment;
        hours = secondsToHms(workSchedule.work_time_seconds);
    }

    return (
        <div className="userWorkSchedule">
            <div className="userSearchFilter">
                <Row className="userProfile" align="middle">
                    <Col span={8}>
                        <Badge dot={true} offset={[-2, 20]} color="#40BF00">
                            <img
                                src={avatar_image}
                                alt="avatar"
                                className="userAvatarIcon"
                            />
                        </Badge>
                    </Col>
                    <Col span={10}>
                        <p className="name">{first_name}</p>
                        <p className="hours">{hours}</p>
                    </Col>
                    <Col span={4} offset={2}>
                        <div>
                            {!!comment && (
                                <Tooltip
                                    placement="topLeft"
                                    title={comment}
                                    color="#000"
                                >
                                    <img
                                        src={commentBlueIcon}
                                        alt="comment"
                                        className="commentIcon"
                                    />
                                </Tooltip>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="timeFrame">
                {timeLine.map((value, index) => {
                    let className = getTimeIntervalClass(
                        workShifts,
                        selectedDate,
                        value
                    );
                    return (
                        <div key={index} className={className}>
                            <span></span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserSchedule;
