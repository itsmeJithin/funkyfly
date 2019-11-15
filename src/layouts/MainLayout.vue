<template>
  <section>
    <div id="wrapper">
      <Sidebar/>
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <Header/>
          <slot/>
        </div>
        <!--<Footer/>-->
      </div>
    </div>
  </section>
</template>

<script>
  import Header from '../components/common/Header'
  import Footer from '../components/common/Footer'
  import Sidebar from '../components/common/Sidebar'

  export default {
    name: 'MainLayout',
    components: {Header, Footer, Sidebar}
  }
</script>

<style scoped>

</style>
