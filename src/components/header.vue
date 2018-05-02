<template>
  <div v-cloak>
      <div class="Header">
        <span class="left" @click="clickLeft">返回</span>
        <span class="title">{{headerTitle}}</span>
        <span class="right" @click="clickRight">确认</span>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:'headerBar',
    data(){
        return {

        }
    },
    props:{
        clickLeft:{
            type:Function,
            default(){
                return function(){
                    console.log("clickLeft");
                }
            }
        },
        clickRight:{
            type:Function,
            default(){
                return function(){
                    console.log("clickRight");
                }
            }
        }
    },
    computed:{
        // headerTitle(state){
        //     return this.$store.state.headerTitle
        // }
        // 这里的mapState 其实就是 上面的书写方式 只是借助了mapState辅助函数 并且加上...解构是为了 在多个状态的时候 方便书写
        // (我理解的就是初始化给一个this.headerTitle为store中headerTitle的默认值)
        ...mapState([
			'headerTitle'
		])
    }
}
</script>

<style lang="less" scoped>
.Header{
    display: table;
    line-height: 45px;
    text-align: center;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    span{
        display: table-cell;
    }
    .left,.right{
        width: 80px;
        line-height: 45px;
    }
}
</style>

