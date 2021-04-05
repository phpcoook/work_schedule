import React, { useState } from 'react';
import { Menu, Dropdown as Select, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { weeksOptions } from '../../../constants/calendar';

/**
 * 
 * loop through all dropdown option and attach function call
 * on click event
 * 
 * @typedef {object} DropdownOptions
 * 
 * @prop {Object} weeks
 * @prop {Function} onChange
 * 
 * @returns 
 */
const DropdownOptions = (props: DropdownOptions) => {
    const { weeks, onChange } = props;
    return (
        <Menu>
            {weeks.map((value: string, index: number) => {
                return (
                    <Menu.Item
                        key={index}
                        onClick={() => onChange(value, index)}
                    >
                        {value}
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};

/**
 * Displays the current selection from week options and 
 * Attached handleOnChange function on onChange event
 * 
 * @typedef {object} Dropdown
 * 
 * @prop {Function} handleChangeWeek
 * 
 * @returns 
 */
const Dropdown = (props: Dropdown) => {
    const { handleChangeWeek } = props;
    const [week, setWeek] = useState(weeksOptions[0]);
    const handleOnChange = (week: string, index: number) => {
        setWeek(week);
        if (index === 2) {
            handleChangeWeek('previous');
        } else if (index === 1) {
            handleChangeWeek('next');
        } else {
            handleChangeWeek('current');
        }
    };

    return (
        <Select
            overlay={
                <DropdownOptions
                    weeks={weeksOptions}
                    onChange={handleOnChange}
                />
            }
        >
            <Button className="dropDown">
                {week}
                <CaretDownOutlined />
            </Button>
        </Select>
    );
};

export default Dropdown;
