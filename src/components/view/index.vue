<template>
    <div>
        <el-menu :default-active="$route.path" router class="el-menu-vertical-demo"  mode="horizontal">
            <el-menu-item  v-for="(item,i) in tabse" :key="i" :index="item.path">{{item.title}}</el-menu-item>
        </el-menu>
        <div class="ab">
            <el-tabs v-model="activeIndex" type="card" closable @tab-remove="tabRemove"   @tab-click='tabClick'>
                <el-tab-pane  v-for="item in openTab" :key="item.name"  :label="item.title" :name="item.route" >
                    <router-view/>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        
    }, 
    data(){
        return {
            tabse:[],
        }
    },
    methods:{
        //tab标签点击时，切换相应的路由
        tabClick(tab){
        	// console.log("tab",tab);
        	// console.log('active',this.activeIndex);
        	this.$router.push({path: this.activeIndex});
        },
        //移除tab标签
        tabRemove(targetName){
            //首页不删
            if( targetName == '/a'){
                return 
            }else{
                this.$store.commit('DELETE_TABS', targetName);
                if (this.activeIndex === targetName) {
                    // 设置当前激活的路由
                    if (this.openTab && this.openTab.length >= 1) {
                    this.$store.commit('SET_ACTIVEINDEX', this.openTab[this.openTab.length-1].route);
                    this.$router.push({path: this.activeIndex});
                    } else {
                     this.$router.push({path: '/a'});
                    }
                }
            } 
        },
        
    },
    created () {
        this.tabse =this.$store.state.userInfo.menus
    },
    mounted () {
        if (this.$route.path == '/a') {
            this.$store.commit('ADD_TABS', {route: this.$route.path , name: this.$route.name,title:this.$route.meta.title});
            this.$store.commit('SET_ACTIVEINDEX', this.$route.path);
        } else {
            this.$store.commit('SET_ACTIVEINDEX', '/a');
            this.$router.push('/a');
        }
    },
    computed: {
        openTab () {
            return this.$store.state.openTab;
        },
        activeIndex:{
            get () {
                return this.$store.state.activeIndex;
            },
            set (val) {
                this.$store.commit('SET_ACTIVEINDEX', val);
            }
        }
    },
    watch:{
        '$route'(to,from){
            let flag = false;
            for(let item of this.openTab){
                if(item.route == to.path){
                    this.$store.commit('SET_ACTIVEINDEX',to.path)
                    flag = true;
                    break;
                
                }
            }
            if(!flag){
                this.$store.commit('ADD_TABS', {route: to.path, name: to.name, title:to.meta.title});
                this.$store.commit('SET_ACTIVEINDEX', to.path);
            }
        }
    }
}
</script>
<style>

</style>