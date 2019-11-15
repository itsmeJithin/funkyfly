<template>
  <MainLayout>
    <div class="container-fluid " :class="selectedUser?'p-0':''">
      <ChatBox v-if="selectedUser"
               :user-id="selectedUser"
               :user="user"/>
      <Dashboard v-else/>
    </div>
  </MainLayout>
</template>
<script>
  import MainLayout from '../../layouts/MainLayout'
  import Dashboard from '../../components/home/Dashboard'
  import ChatBox from '../../components/home/ChatBox'
  import store from '../../store.js'

  export default {
    name: 'Home',
    components: {ChatBox, MainLayout, Dashboard},
    data () {
      return {
        selectedUser: '',
        user: {}
      }
    },
    sockets: {
      makeMeOnline: function () {

      }
    },
    mounted () {
      let self=this;
      self.changeChatBox()
      self.$store
        .dispatch('validateLoginToken')
        .then(function (response) {
          self.user = response.data
        })
        .catch(function (error) {
          console.log(error)
          self.router.push('/login')
        })
    },
    methods: {
      changeChatBox () {
        this.selectedUser = this.$route.params.uid
      }
    }
  }
</script>
