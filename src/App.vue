<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
.scroll-block {
  height: 60vh;
  overflow-y: scroll;
}

.scroll-block::-webkit-scrollbar {
  width: 4px;
}

.scroll-block::-webkit-scrollbar-thumb {
  background-color: #9d9d9d;
}
</style>
