<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
    class="all-nav-bar"
    title="登陆">
      <template v-slot:left>
        <van-icon @click="router.back()" name="arrow-left" />
      </template>
    </van-nav-bar>
    <van-form ref="loginForm" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="mobile"
          name="mobile"
          placeholder="请输入手机号"
          :rules="mobileRules"
          type="number"
          maxlength="11"
        >
          <template v-slot:left-icon>
            <i class="iconfont icon-shouji"></i>
          </template>
        </van-field>
        <van-field
          v-model="code"
          type="number"
          name="code"
          placeholder="请输入验证码"
          :rules="codeRules"
          maxlength="11"
        >
          <template v-slot:left-icon>
            <i class="iconfont icon-mima"></i>
          </template>
          <template #button>
            <van-count-down
              v-if="isCountDownShown"
              :time="60 * 1000"
              format="ss s"
              @finish="isCountDownShown = false"
            />
            <!-- native-type为button是为了防止btn触发表单提交 -->
            <van-button
              v-else
              @click="sendMessage"
              size="small"
              class="send-message-btn"
              round type="default"
              native-type="button"
            >
              发送验证码
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button block type="primary" native-type="submit">
          登陆
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script setup>
import { reactive, toRefs, ref } from 'vue'
import { login, sendMsg } from '@/api/userLogin'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
const user = reactive({
  mobile: '',
  code: '',
  mobileRules: [
    { required: true, message: '请填写用户名' },
    { pattern: /1[3|5|7|8]\d{9}/, message: '手机号格式错误' }
  ],
  codeRules: [
    { required: true, message: '请填写验证码' },
    { pattern: /^\d{6}$/, message: '手机验证码错误' }
  ]
})
const loginForm = ref(null)
const isCountDownShown = ref(false)
const store = useStore()
const router = useRouter()
const { mobile, code, mobileRules, codeRules } = toRefs(user)
// 功能:表单提交登陆
const onSubmit = async (values) => {
  // console.log('submit', values)
  // 1 获取表单数据
  // 2 表单认证
  Toast('gun')
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  // 3 提交表单请求登陆
  try {
    const { data } = await login(user)
    console.log(data.data)
    store.commit('setUserToken', data.data)
    Toast.success('登陆成功')
    router.replace('/personalPage')
  } catch (e) {
    if (e.response.status === 400) {
      Toast.fail('手机号错误或验证码错误')
    } else {
      Toast.fail('登陆失败')
    }
  }
  // 4 根据请求响应结果处理后续操作
}
// 功能:发送验证码
const sendMessage = async () => {
  // 1手机号验证
  // 2验证通过显示倒计时
  // 3请求发送验证码
  try {
    await loginForm.value.validate('mobile')
    isCountDownShown.value = true
    Toast.success('发送成功')
    try {
      await sendMsg(user.mobile)
    } catch (e) {
      isCountDownShown.value = false
      if (e.response.status === 429) {
        Toast.fail('发送太频繁,请稍后重试')
      } else {
        Toast.fail('发送失败')
      }
    }
  } catch (e) {
    Toast.fail('发送验证码失败')
  }
}
</script>

<style scoped lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-message-btn {
    background-color: #ededed;
    font-size: 22px;
    width: 160px;
    height: 50px;
    border: 1px;
    line-height: 50px;
    color: #666
  }
}
</style>
