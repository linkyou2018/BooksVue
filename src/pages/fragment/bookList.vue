<template>
  <div id="sort_app" v-cloak>
    <div class="header-bg sort-header">
      <span class="header-title font-size-34">书单</span>
    </div>
    <div class="sort-left">
      <div style="height: 2.472rem;"></div>
      <div v-for="(t, index) in dataList">
        <div class="sort-table font-size-32" @click="selectSortTable(index)">
          <span :class="{'sort-table-active': sortTableActive[index]}">{{t.Title}}</span>
        </div>
        <div v-if="sortTableActive[index]">
          <div class="sort-first" :class="{'sort-first-active': isFirstActive[idx]}" @click="selectFirstSort(idx,i.Id)" v-for="(i, idx) in t.ChildBookTypeList">
            {{i.Name}}
            <div v-if="isFirstActive[idx]"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="sort-right">
      <div style="height: 4.638rem;"></div>
      <div class="sort-second" v-for="(t, index) in tagTypeList">
        <div class="sort-second-name">{{t.Title}}</div>
        <div class="sort-third" @click="selectBooklist(index, idx)" v-for="(i, idx) in t.TagTypeList">
          <img :src="i.PhotoPath" />
          <div class="font-size-24 ellipsis">{{i.Name}}</div>
        </div>
      </div>
    </div>
    <br>
    <br>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'bookList',
  data() {
    return {
      tableIndex: null,
      sortTableActive: [],
      sortTable: [],
      firstIndex: null,
      isFirstActive: [],
      firstSortData: [],
      secondSortData: [],
      listId: [],
      listIdStr: ''
    }
  },
  methods: {
    selectSortTable: function(i, s) {
      //console.log(i);
      if (this.tableIndex == i) {
        return
      }
      this.tableIndex = i
      var _this = this,
        length = this.dataList.length
      for (var j = 0; j < length; j++) {
        this.sortTableActive[j] = false
      }
      this.sortTableActive[i] = true
      this.$set(this.sortTableActive, i, this.sortTableActive[i])
      var _id = this.dataList[i].ChildBookTypeList[0].Id
      this.selectFirstSort(0, _id)
    },
    selectFirstSort: function(i, id) {
      // console.log(i+"~~~"+id);
      for (var j = 0; j < this.isFirstActive.length; j++) {
        this.isFirstActive[j] = false
      }
      this.isFirstActive[i] = true
      this.getTagTypeList(id)
    },
    getDataList: function() {
      this.$store
        .dispatch({
          type: 'GetMenuList'
        })
        .then(res => {
          this.selectSortTable(0)
        })
    },
    getTagTypeList: function(id) {
      this.$store.dispatch({
        type: 'GetTagTypeList',
        id: id
      })
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    ...mapState({
      dataList: state => state.bookList.dataList,
      tagTypeList: state => state.bookList.tagTypeList
    })
  },
  created() {
    this.getDataList()
    this.$store.commit({
      type: 'setIsFoot',
      value: true
    })
  }
}
</script>
<style scoped>
@import '../../../static/css/sort/sort.css';
</style>
