
import {
	ADD_USER_COUNT
} from './mutation-types';

export default {
    [ADD_USER_COUNT](state,payload){
        state.totalCount=state.totalCount+payload;
    }
}
