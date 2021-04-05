import axios from 'axios';
import { Server } from 'miragejs';
import { users } from '../fixtures/users';
import * as _ from 'lodash';

export const getUsers = () => {
    new Server({
        routes() {
            this.get('api/users/', () => {
                return users;
            });
        }
    });

    return axios({
        method: 'get',
        url: 'api/users'
    });
};
