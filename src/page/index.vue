<template>
  <div class="" v-cloak>
      <header-bar :click-left='clickLeft' :click-right="clickRight"></header-bar>
    <ul class="menu">
        <li @click="choose(index)" v-for="(item,index) in menu" :class="{'active':item.active}">{{item.name}}</li>
    </ul>
    <div class="list_warp">
        <!-- :class="{'fadeRight':isFade}" -->
        <transition enter-active-class="fadeRight">
            <div v-for="(item,index) in list" class="list " :key="tab">
                <p class="">{{item.title}}</p>
                <p><img :src='item.img' alt=""></p>
            </div>
        </transition>
    </div>
    <!-- 总人数 vuex Getter --> 
    <div>总人数：{{totalCount}}</div>
    <button @click="changeCount(20)">修改人数</button>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import headerBar from "../components/header.vue";
export default {
  name: "index",
  data() {
    return {
      menu: [],
      list: [],
      isFade: true,
      tab: 0
    };
  },
  components: {
    headerBar
  },
  created() {
    //   this.ADD_USER_COUNT(1);
  },
  watch: {},
  filters: {},
  mounted() {
    this.getMenu();
  },
  computed: {
    // 映射 `this.totalCount` 为 `store.getters.addCount` mapGetters相当于是store的一个计算属性
    ...mapGetters({
      totalCount: "addCount"
    })
  },
  methods: {
    /**
     * 
    Action 类似于 mutation，不同在于：
    Action 提交的是 mutation，而不是直接变更状态。
    Action 可以包含任意异步操作。
     * **/

    // ...mapMutations({
    //   // payload 载荷 在调用的时候传入
    //   changeCount: "ADD_USER_COUNT" // 将 `this.changeCount()` 映射为 `this.$store.commit('ADD_USER_COUNT')`
    // }),
    ...mapActions({
      hangeCount: 'change_count' // 将 `this.changeCount()` 映射为 `this.$store.dispatch('change_count')` change_count其实就是 'ADD_USER_COUNT' 这个mutation
    }),
    // changeCount(){
    //     this.$store.dispatch('change_count',100)
    // },
    clickLeft() {
      console.log("clickLeft");
    },
    clickRight() {
      console.log("clickRight");
    },
    getMenu() {
      axios({
        method: "post",
        url: "/api/menu"
      }).then(res => {
        console.log(res.data);
        this.menu = res.data.menu;
        let arr = res.data.menu;
        this.list = arr.filter(function(element) {
          return element.active;
        })[0].sub;
      });
    },
    choose(index) {
      this.tab = index;
      this.menu.forEach(element => {
        element.active = false;
      });
      this.menu[index].active = true;
      this.list = this.menu[index].sub;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.van-icon {
  position: relative;
  display: inline-block;
  font: normal normal normal 14px/1 vant-icon;
  font-size: inherit;
  text-rendering: auto;
}
.van-icon-arrow:before {
  content: "\F006";
}
.van-icon:before {
  display: inline-block;
}
.slideInRight {
  animation-duration: 0.25s;
}
* {
  margin: 0;
  padding: 0;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  display: inline-block;
}
a {
  color: #42b983;
}
.menu {
  overflow: hidden;
  > li {
    float: left;
    width: 20%;
    text-align: center;
    &.active {
      color: red;
    }
  }
}
.list_warp {
  overflow: hidden;
}
.list {
  > p {
    margin-top: 15px;
  }
}
.fadeRight {
  animation: fadeRight 1s 1 both;
  transition-duration: 0.25s;
}
@keyframes fadeRight {
  0% {
    transform: translateX(20%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
