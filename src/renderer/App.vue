<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "perse"
  // components: { Sidebar }
};
</script>

<style lang="scss">
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");

html,body{
  background: url('../../static/bg.jpg') $bg 100% 100%;
  background-attachment: fixed;
  background-size: cover;
}

#app {
  @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
  overflow-y: auto;
  height: 100vh;
  width: 100vw;
  font-family: "Source Sans Pro", sans-serif;
}

h1,
h2,
h3,
h4,
h5,
p {
  color: white;
}

.backButton {
  width: 48px;
  height: 48px;
  position: absolute;
  top: 0;
  left: 0;
  padding: 6px;

  &:after {
    content: "\f060";
    font-family: FontAwesome;
    font-size: 24px;
    color: white;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
}

.copyButton {
  width: 48px;
  height: 48px;
  padding: 6px;

  &:after {
    content: "\f0c5";
    font-family: FontAwesome;
    font-size: 24px;
    color: white;
    opacity: 0.7;
  }

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
}

.el-input__inner {
  background: $bg-secondary;
  border-color: $border;
  color: $text-secondary;
}
</style>
