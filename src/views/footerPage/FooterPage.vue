<template>
  <router-view/>
  <van-tabbar v-model="active" class="footer-tabbar" route>
    <van-tabbar-item replace to="/homePage">
      <template v-slot:icon>
        <i class="iconfont icon-shouye"></i>
      </template>
      <span>首页</span>
    </van-tabbar-item>
    <van-tabbar-item icon="search" replace to="/questionPage">问答</van-tabbar-item>
    <van-tabbar-item icon="friends-o" replace to="/videoPage">
      <template v-slot:icon>
        <i class="iconfont icon-tongxunlu-moren"></i>
      </template>
      <span>视频</span>
    </van-tabbar-item>
    <van-tabbar-item replace to="/personalPage">
      <template v-slot:icon>
        <i class="iconfont icon-yonghu"></i>
      </template>
      <span>{{ isLogged ? '我的' : '未登录' }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
const active = ref(0)
const store = useStore()
const isLogged = computed(() => store.state.userToken)
</script>
<style scoped lang="less">
  .footer-tabbar {
    .iconfont {
      font-size: 40px;
    }
    span {
      font-size: 20px;
    }
  }
</style>
