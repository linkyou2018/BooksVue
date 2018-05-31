<template>
    <div class="manage">
        <header-back title="我的信息管理" ></header-back>
        <div style="height: 2.472rem;"></div>
        <div class="login-form">
            <div class="login-form-li font-size-32">
                <div class="list-left">昵称</div>
                <div class="list-center"><input id="nickname" type="text" class="login-input font-size-32" :class="{'input-active': inputNickname != ''}" maxlength="15" placeholder="请输入" v-model="inputNickname" /></div>
            </div>
            <div class="login-form-li font-size-32">
                <div class="list-left">性别</div>
                <div class="list-center list-s">
                    <i :class="{'list-s-active': sex == '2'}" @click="selectSex('2')"></i>
                    <span>女</span>
                    <i :class="{'list-s-active': sex == '1'}" @click="selectSex('1')"></i>
                    <span>男</span>
                </div>
            </div>
            <div class="login-form-li font-size-32">
                <div class="list-left">年级</div>
                <div class="list-center">
                    <select class="font-size-32" :class="{'input-active': grade != ''}" v-model="grade">
                        <option disabled value="">请选择</option>
                        <option v-for="i in gradeArr">{{i}}</option>
                    </select>
                </div>
            </div>
            <div class="login-form-li font-size-32">
                <div class="list-left">所在区</div>
                <div class="list-center">
                    <select class="font-size-32" :class="{'input-active': area != ''}" v-model="area">
                        <option disabled value="">请选择</option>
                        <option v-for="i in areaArr">{{i}}</option>
                    </select>
                </div>
            </div>
            <div class="login-error font-size-24" v-show="loginError.length > 0">

            </div>
        </div>
        <div class="bd-content-button font-size-34">
            <div @click="doSubmit()">下一步</div>
        </div>
    </div>
</template>
<style scoped>
@import "../../../static/css/user/user-manage.css";
</style>
<script>
import HeaderBack from '../../components/headerBack'
export default {
  name: 'manage',
  components: {
    HeaderBack
  },
  data() {
    return {
      setTime: -1,
      loginError: '',
      openid: '',
      inputNickname: '',
      sex: '2',
      grade: '',
      gradeArr: [
        '成年',
        '幼儿园',
        '小一',
        '小二',
        '小三',
        '小四',
        '小五',
        '小六',
        '初一',
        '初二',
        '初三'
      ],
      area: '',
      areaArr: ['福田', '罗湖', '南山'],
      reqState: 1
    }
  },
  created() {}
}
</script>

