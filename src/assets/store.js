import { createStore } from "vuex"
import datas from './datas.js'
import filters from './filters.js'
import axios from 'axios'

const store = createStore({
  state() {
    return {
        posts: datas, // 인스타그램 포스트 목록
        filters : filters, // 필터 목록
        filter: '', // 선택한 필터
        moreId: 0,  // 더보기 요청용 
        imgUrl: '', // 새 포스트 작성할 때 이미지 url
        step: 0,  // 화면 전환을 위한 스텝
        item: {}, // 새 포스트
        search: false,
        followers : [],
    };
  },
  mutations: {
    // 좋아요 & 좋아요 취소 기능
    doLike(state, payload) {
        if(!state.posts[payload].liked){
            state.posts[payload].likes++;
            state.posts[payload].liked = true;
        } else {
            state.posts[payload].likes--;
            state.posts[payload].liked = false;
        }
    },
    // 더보기 : actions 안에 정의된 axios 호출 후 실행
    viewMore(state, payload) {
        state.posts.push(payload);
        state.moreId++;
    },
    // next 버튼 누를 때
    next(state) {
        state.step++;
    },
    // 사과버튼 누를 때 : 팔로워 검색창
    search(state) {
        if(!state.search) {
            state.step = 3; 
            state.search = true;
        } else {
            state.step = 0;
            state.search = false; 
        }
    },
    // 사진 업로드
    upload(state, payload) {
        state.imgUrl = URL.createObjectURL(payload);
        state.step++;
    },
    // 새 포스트에 적용된 필터 정보 저장
    saveFilter(state, payload) {
        state.filter = payload;
    },
    // 발행
    publish(state) {
        let newPost = {
            name: "judy",
            userImage: "https://picsum.photos/100?random=6",
            postImage: state.imgUrl,
            likes: 0,
            date: new Date().toString(),
            content: state.item.content,
            liked: false,
            filter: state.filter,
        };
        state.posts.unshift(newPost);
        state.step = 0;
    },
    
  },

  actions: {
    more(context) {
        axios.get(`https://codingapple1.github.io/vue/more${this.state.moreId}.json`)
        .then(res => {
            context.commit('viewMore', res.data);
        })
        .catch(err => {
            console.log(err);
        })
    },
    
  },
});

export default store;
