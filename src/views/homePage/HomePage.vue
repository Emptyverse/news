<template>
  <div class="home-container">
    <van-nav-bar
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
        <!-- {{ channel.name }} -->
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
  :deep(.channel-tabs) {
    border-bottom: 1px solid rgb(218, 218, 218);
    .van-tab {
      min-width: 200px;
      height: 82px;
      border-right: 1px solid #edeff3;
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
