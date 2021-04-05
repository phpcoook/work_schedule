/// <reference types="react-scripts" />

type RouteProps = {
    component: Function;
    exact: boolean;
    path: string;
};

type WorkSchedule = {
    id: number;
    user_id: number;
    date: string;
    shifts: Shift[];
    work_time_seconds: number;
    comment: string;
};

type DaySchedule = {
    id: number;
    user_id: number;
    shifts: any;
    date: string;
    work_time_seconds: number;
    comment: string;
};

type Shift = {
    start_time: string;
    end_time: string;
};

type weekDay = {
    dateString: string;
    date: number;
    day: string;
};

type DaySchedules = {
    daySchedule: DaySchedule[];
    updateSchedule: Function;
    updateLog: Function;
    editing: boolean;
    editHours: boolean;
    editComment: boolean;
    handleSetEditComment: Function,
    handleSetEditHours: Function
};

type Users = User[];

type User = {
    id: number;
    user_id: number;
    company_id: number;
    user_email: string;
    first_name: string;
    last_name: string;
    user_password: string;
    avatar_image: string;
    workSchedule: any;
    selectedDate: string;
};

type PeriodDetails = {
    weekDays: weekDay[];
    workSchedules: WorkSchedule[];
};

type changeLog = {
    work_time_id: number;
    modifier_user_id: number;
    change_datetime: string;
    change_type_enum: string;
    start_datetime_before: string;
    start_datetime_after: string;
    end_datetime_before: string;
    end_datetime_after: string;
    work_time_seconds_before: number;
    work_time_seconds_after: number;
    comment_before: string;
    comment_after: string;
};

type InfoBox = {
    log : changeLog[]
};

type CommentProps = {
    handleOnCommentChange : Function;
    comment : string;
    handleOnSubmit : Function;
    handleOnDeleteComment : Function;
};

type WorkHours = {
    handleOnChange : Function;
    hours : number;
    handleOnSubmit : Function;
    handleOnDeleteWorkHours : Function;
};

type WorkShift = {
    index : number;
    handleOnChangeShift : Function;
    start_time : string;
    end_time: string;
    handleOnDeleteWorkShifts : Function;
};

type ChangeLog = {
    id: number
}

type ScheduleCard = {
    activeClass: string;
    weekDay: weekDay;
    workSchedules: WorkSchedule[];
    currentDay: string;
}

type EditOptions = {
    userWorkSchedule : WorkSchedule[],
    date: string,
    handleSetEditing: Function
}

type Dropdown = {
    handleChangeWeek: Function
}

type DropdownOptions = {
    weeks : string[],
    onChange: Function
}