<template>
  <div>
    <!-- 포스트 목록 화면 -->
    <div v-if="$store.state.step == 0">
      <Post v-for="(post, i) in posts" :key="i" :i="i" :post="post"/>
    </div>

    <!-- 이미지 등록 화면1 - 필터 고르는 화면 -->
    <div v-if="$store.state.step == 1">
      <div :class="`${filter} upload-image`" :style="`background-image:url(${$store.state.imgUrl})`"></div>
      <div class="filters">
        <FilterBox v-for="(filter, i) in $store.state.filters" :key="i" :filter="filter" >
          {{ filter }}
        </FilterBox>
      </div>
    </div>

    <!-- 이미지 등록 화면2 - 내용 쓰는 화면 -->
    <div v-if="$store.state.step == 2">
      <div :class="`${filter} upload-image`" :style="`background-image:url(${$store.state.imgUrl})`"></div>
      <div class="write">
        <textarea @input="$emit('write', $event.target.value)" name="write-box-name" id="write-box-id" class="write-box">write!</textarea>
      </div>
    </div>

    <!-- 팔로워 검색 화면-->
     <div v-if="$store.state.step == 3">
       <MyPage />
     </div>
  </div>
</template>

<script>
import Post from "./Post.vue"
import FilterBox from "./FilterBox.vue"
import MyPage from './MyPage.vue'
// import filters from './../assets/filters.js'

export default {
  name: "containerComponent",
  data() {
    return {
    //  filters: filters,
      filter: '',
    }
  },  
  mounted() {
    this.emitter.on('setFilter', (filter)=>{
      this.filter = filter;
    });
  },
  components: {
    Post,
    FilterBox,
    MyPage,
  },
  props: {
    posts: Array,
  //  step: Number,
  //  imgUrl: String,
  },
};
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>