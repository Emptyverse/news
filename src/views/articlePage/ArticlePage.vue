<template>
  <div>
    <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :error="error"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad">
        <ArticleItem
          v-for="item in list"
          :key=item.art_id
          :articleItem="item">
        </ArticleItem>
        <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getArticleList } from '@/api/article'
import ArticleItem from '@/components/articleItem/ArticleItem.vue'
const list = ref([])
const loading = ref(false)
const finished = ref(false)
const timeStamp = ref(null)
const error = ref(false)
const refreshing = ref(false)
const props = defineProps({
  channel: {
    type: Object,
    required: true
  }
})
const onLoad = async () => {
  // 1 请求获取数据
  try {
    const { data } = await getArticleList({
      channel_id: props.channel.id,
      timestamp: timeStamp.value || Date.now()
    })
    // 2 把请求结果数据放到list数组中
    const { results } = data.data
    // 按时间戳分页加载，数据push进去list中
    // console.log(results)
    list.value.push(...results)
    // console.log(list.value)
    // 3 本次数据加载结束后要把加载状态设置为结束
    loading.value = false
    // 4 判断数据是否全部加载完成
    if (results.length) {
      // 更新获取下一页数据的时间戳
      timeStamp.value = data.data.pre_timestamp
    } else {
      // 无数据了就将finished设置为true
      finished.value = true
    }
  } catch (e) {
    error.value = true
    loading.value = false
  }
}
// 下拉刷新触发函数
const onRefresh = async () => {
  try {
    // 1 获取最新数据
    const { data } = await getArticleList({
      channel_id: props.channel.id,
      timestamp: Date.now()
    })
    // 2 数据添加到数组列表头部
    list.value.unshift(...data.data.results)
    refreshing.value = false
  } catch (e) {
    console.log(e)
  }
}
</script>

<style scoped>
</style>
