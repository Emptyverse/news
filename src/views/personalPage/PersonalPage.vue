<template>
  <div class="personal-container">
    <div v-if="isLogged" class="header logged">
      <div class="first-info">
        <div class="left">
          <van-image
            class="avatar"
            round
            fit="cover"
            src="https://unpkg.com/@vant/assets/cat.jpeg"
          />
          <span>黑马头条</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="second-info">
        <div class="info-item">
          <span class="count">10</span>
          <span class="text">头条</span>
        </div>
        <div class="info-item">
          <span class="count">10</span>
          <span class="text">头条</span>
        </div>
        <div class="info-item">
          <span class="count">10</span>
          <span class="text">头条</span>
        </div>
        <div class="info-item">
          <span class="count">10</span>
          <span class="text">头条</span>
        </div>
      </div>
    </div>
    <div v-else class="header notLogged">
      <div class="login-btn" @click="router.push('/login')">
        <img class="login-img" src="@/assets/2.png" alt="">
        <span>登陆/注册</span>
      </div>
    </div>
    <van-grid class="third-info" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <template v-slot:icon>
          <i class="iconfont icon-shoucang"></i>
        </template>
        <template v-slot:text>
          <span>收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <template v-slot:icon>
          <i class="iconfont icon-shuben"></i>
        </template>
        <template v-slot:text>
          <span>历史</span>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      v-if="isLogged"
      class="logout-cell"
      title="退出登陆"
      @click="logout"
      clickable
       />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { Dialog, Toast } from 'vant'
import { getUserInfo } from '@/api/userLogin'
const router = useRouter()
const store = useStore()
// const proxy = getCurrentInstance()
const isLogged = computed(() => store.state.userToken)
console.log(isLogged)
const logout = () => {
  Dialog.confirm({
    title: '是否确认退出'
  }).then(() => {
    // on confirm
    store.commit('setUserToken', null)
    // window.localStorage.removeItem('')
    console.log('退出成功')
  }).catch(() => {
    // on cancel
  })
}
const loadUserInfo = async () => {
  try {
    const { data } = await getUserInfo()
    console.log(data)
  } catch {
    Toast('获取用户信息失败')
  }
}
if (store.state.userToken) {
  loadUserInfo()
}
</script>

<style scoped lang="less">
  .personal-container {
    .header {
      height: 360px;
      background: url(@/assets/1.png);
      background-size: cover;
    }
    .notLogged {
      display: flex;
      justify-content: center;
      align-items: center;
      .login-btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .login-img {
          width: 130px;
          height: 130px;
        }
      }
    }
    .logged {
      .first-info {
        height:230px;
        padding: 76px 32px 23px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          .avatar {
            width: 132px;
            height: 132px;
            margin-right: 23px;
            border: solid 1px #fff;
          }
          span {
            font-size: 30px;
            color: #fff
          }
        }
      }
      .second-info {
        display: flex;
        .info-item {
          height: 130px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          .count {
            font-size: 36px;
          }
          .text {
            font-size: 23px
          }
        }
      }
    }
    .third-info {
        .grid-item {
          height: 140px;
          .iconfont {
            font-size: 45px;
          }
          .icon-shoucang{
            color: #eb5253
          }
          .icon-shuben {
            color: #ff9d1d;
          }
          span {
            font-size: 28px;
          }
        }
      }
    .logout-cell {
      text-align: center;
      color: #eb5253
    }
  }
</style>
