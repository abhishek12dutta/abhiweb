import Vue from 'vue';
import Vuex from 'vuex';

import { account } from './account.module';

import { alert } from './alert.module';

import {todo} from './todo.module';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        account,
        alert,
        todo
    }
});