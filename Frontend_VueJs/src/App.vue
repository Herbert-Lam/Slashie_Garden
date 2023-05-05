<template>
  <div id="app">
    <div>
      <header-bar :userTypeId="userTypeId" :setUserTypeId="setUserTypeId"></header-bar>
    </div>
    <div id="page-container">
      <router-view :userTypeId="userTypeId"></router-view>
    </div>
    <div>
      <footer-section/>
    </div>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'
import FooterSection from './components/FooterSection.vue'

export default {
  name: 'App',
  components: {
    HeaderBar,
    FooterSection
  },
  data() {
    return {
      userTypeId: 1,
      userType: 1

    }
  },

  methods: {
    setUserTypeId(userTypeId) {
      this.userTypeId = userTypeId;
      if (userTypeId == 1) {
        localStorage.setItem('typeId', 1);
        console.log(userTypeId);
      } else {
        localStorage.setItem('typeId', 2);
      }
    }
  }
}
</script>

<style>
.app{
  max-width: 1000px; 
  margin: 0 15px; 
}

#page-container {
  position: relative;
  min-height: 100vh;
}

</style>
