export default {
    // ES201    5 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）：
    change_count({dispatch,commit},palyload){
        commit('ADD_USER_COUNT',palyload);
    }
}
