<template>
  <div class="home-container">
    <van-nav-bar
      fixed
      class="all-nav-bar"
      title="首页"
    >
    </van-nav-bar>
    <van-tabs class="channel-tabs" v-model="active" animated swipeable type="line">
      <van-tab
        v-for="channel in channelList"
        :title="channel.name"
        :key="channel.id"
      >
        <ArticlePage :channel="channel"/>
      </van-tab>
      <template v-slot:nav-right>
          <div class="stone"></div>
          <i class="iconfont icon-caidan"></i>
      </template>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getUserChannels } from '@/api/userLogin'
import { Toast } from 'vant'
import ArticlePage from '@/views/articlePage/ArticlePage.vue'
const channelList = ref([])
const active = ref(2)
async function loadChannels () {
  try {
    const { data } = await getUserChannels()
    channelList.value = data.data.channels
  } catch (e) {
    Toast('获取频道失败')
  }
}
loadChannels()
</script>

<style scoped lang="less">
.home-container {
  padding-top: 87px;
  margin-bottom: 100px;
  :deep(.channel-tabs) {
    .van-tabs__nav {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      height: 82px;
      border-right: 1px solid #edeff3;
      .van-tabs__text {
        font-size: 30px;
      }
    }
    .van-tabs__line {
      background-color: orange;
      width: 60px;
      border-radius: 0;
    }
    i {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      font-size: 43px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.9;
    }
    .stone {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
  }
}
</style>
