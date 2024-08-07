<template>
  <div stype="padding: 10px;">
    <h4>팔로워</h4>
    <input type="text" placeholder="사용자명 검색" @input="search"/>
    <div v-for="follower in followers" :key="follower.id">
      <div class="post-header">
        <div class="profile" :style="`background-image:url(${follower.image})`"></div>
        <span class="profile-name">{{ follower.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"
import axios from 'axios'

export default {
  name: "myPage",

  // composition API 사용하려면 setup()안에 정의
  setup() {
    let followers = ref([]);
    let originFollowers = ref([]);

    // composition API 안에서 life hook 쓰는 방법
    // mounted(){} => onMounted(()=>{}) 이런식이고 import를 해줘야함
    onMounted(() => {
      axios.get('/follower.json')
      .then(res => {
        followers.value = res.data;
        originFollowers.value = [...res.data];
      }).catch(err => {
        console.log(err);
      })
    })
    
    // 검색 기능
    // 함수 선언 후 함수명을 return 해줘야함
    function search(e) {
      if(e.target.value !== '') {
        followers.value = followers.value.filter(fol => {
          return fol.name.includes(e.target.value);
        })
      } else {
        followers.value = originFollowers.value;
      }
    }

    return { followers, search };

  },
};
</script>

<style>
</style>