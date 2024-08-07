<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="step = 0">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="$store.state.step != 2" @click="$store.commit('next')">Next</li>
      <li v-if="$store.state.step == 2" @click="$store.commit('publish')">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" @click="$store.commit('search')">
  </div>
  
  <Container :posts="$store.state.posts" @write="$store.state.item.content = $event"/>

  <div v-if="$store.state.step == 0" class="more-button">
    <button @click="$store.dispatch('more')">더보기</button>
  </div>

  <div class="footer">
    <ul v-if="$store.state.step == 0" class="footer-button-plus">
      <input @change="$store.commit('upload', $event.target.files[0])" type="file" id="file" class="input-file">
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import Container from './components/Container.vue'
// import datas from './assets/datas.js'
// import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
    //  posts: datas,
    //  moreId: 0, 
    //  step: 0,
    //  imgUrl: '',
    //  item: {},
    //  filter: '',
    }
  },
  // mounted() {
  //   this.emitter.on('setFilter', (e) => {
  //     this.filter = e;
  //   });
  // },  
  methods: {
    // more(){
    //   axios.get(`https://codingapple1.github.io/vue/more${this.moreId}.json`)
    //   .then(res => {
    //     this.posts.push(res.data);
    //     this.moreId++;
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // },
    // upload(e) {
    //   // console.log(e.target.files);
    //   this.imgUrl = URL.createObjectURL(e.target.files[0]);
    //   this.step++;
    // },
    // publish() {
    //   let myPost = {
    //     name: "judy",
    //     userImage: "https://picsum.photos/100?random=6",
    //     postImage: this.imgUrl,
    //     likes: 0,
    //     date: new Date().toString(),
    //     content: this.item.content,
    //     liked: false,
    //     filter: this.filter,
    //   };
    //   this.posts.unshift(myPost);
    //   this.step = 0;
    // },  
  },
  components: {
    Container,
  },
}
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style: none;
}
.logo{
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
  cursor: pointer;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80%;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.input-file {
  display: none;
}
.input-plus {
  cursor: pointer;
}
.more-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
</style>
