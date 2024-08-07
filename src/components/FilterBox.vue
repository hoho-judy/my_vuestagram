<template>
  <div @click="setFilter" :class="`${filter} filter-item`" :style="`background-image:url(${$store.state.imgUrl})`">
    <slot></slot>
  </div>
</template>

<script>
import store from './../assets/store.js'

export default {
  name: "filterBoxComponent",
  methods: {
    setFilter() {
        this.emitter.emit('setFilter', this.filter);
        store.commit('saveFilter', this.filter);
    },
  },    
  props: {
  //  imgUrl: String,
    filter: String,
  },
};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
}
</style>