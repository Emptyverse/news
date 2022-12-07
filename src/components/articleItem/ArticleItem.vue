<template>
   <van-cell-group inset class="article-group">
    <van-cell class="article-cell"
    >
      <template v-slot:title>
        <div class="title van-multi-ellipsis--l3">
          {{ articleItem.title }}
        </div>
      </template>
      <template v-slot:label>
        <div v-if="articleItem.cover.type === 3" class="cover-page">
          <div
            class="cover-item"
            v-for="(img, index) in articleItem.cover.images"
            :key="index"
          >
            <van-image class="cover-item-img" :src="String(img)"/>
          </div>
        </div>
        <div>
          <span>{{ articleItem.aut_name }}</span>
          <span>{{ articleItem.comm_count }}</span>
          <span>{{ articleItem.pubdate }}</span>
        </div>
      </template>
      <template v-slot:value v-if="articleItem.cover.type === 1">
          <van-image
          class="one-cover"
          fit="cover"
          :src="String(articleItem.cover.images[0])"
          >
        </van-image>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  articleItem: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="less">
.article-group {
  border-radius: 5px;
  .article-cell {
    margin: 10px;
    .title {
      font-size: 32px;
      color: #3a3a3a
    }
    .van-cell__value {
      flex: 3;
      width: 232px;
      height: 146px;
    }
    .one-cover {
      width: 232px;
      height: 146px;
      }
    .label-info-wrap span {
      font-size: 22px;
      color: #b4b4b4
    }
    .cover-page {
      display: flex;
      padding: 30px 0;
      .cover-item {
        flex: 1;
        height: 146px;
        &:not(:last-child) {
          padding-right: 4px;
        }
        .cover-item-img {
          width: 100%;
          height: 146px;
        }
      }
    }
  }
}
</style>
