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
#app {
  @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
  background: $bg;
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
</style>
