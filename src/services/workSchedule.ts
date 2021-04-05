import axios from 'axios';
import { Server } from 'miragejs';
import workSchedules from '../fixtures/workSchedules';
import { filterWorkScheduleByDateRange } from '../helpers/workSchedule';

export const getWorkSchedule = () => {
    new Server({
        routes() {
            this.get('api/workSchedule', () => {
                return workSchedules;
            });
        }
    });

    return axios({
        method: 'get',
        url: 'api/workSchedule'
    });
};

export const getWorkScheduleByDateRange = (
    start_date: string,
    end_date: string
) => {
    new Server({
        routes() {
            this.post('api/workSchedule', (schema, request) => {
                const { start_date, end_date } = JSON.parse(
                    request.requestBody
                );
                return filterWorkScheduleByDateRange(
                    workSchedules,
                    start_date,
                    end_date
                );
            });
        }
    });

    return axios({
        method: 'post',
        url: 'api/workSchedule',
        data: {
            start_date: start_date,
            end_date: end_date
        }
    });
};
