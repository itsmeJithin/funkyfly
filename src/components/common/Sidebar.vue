<template>
  <ul class="navbar-nav bg-gradient-default sidebar sidebar-light accordion" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">Funky Fly</div>
    </a>

    <!-- Divider -->

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <a class="nav-link w-unset">
        <input type="text" class="form-control bg-light border-0 ml-1 mr-4 navbar-search"
               placeholder="Search or start new chat">
      </a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
      Online
    </div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item" v-for="onlineUser in onlineUsers"
        :key="onlineUser._id">
      <a class="nav-link" href="" v-on:click.prevent="startChatWith(onlineUser._id,onlineUser.socketId)">
        <i class="fas fa-fw fa-circle text-success"></i>
        <span>{{onlineUser.name}}</span></a>
    </li>

    <!-- Nav Item - Utilities Collapse Menu -->
    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
      Friends
    </div>

    <!-- Nav Item - Pages Collapse Menu -->
    <!-- Nav Item - Charts -->
    <li class="nav-item" v-for="availableUser in availableUsers"
        :key="availableUser._id">
      <a class="nav-link" href="" v-on:click.prevent="startChatWith(availableUser._id)">
        <i class="fas fa-fw fa-circle text-gray-200"></i>
        <span>{{availableUser.name}}</span></a>
    </li>
  </ul>
</template>

<script>
  import SidebarService from './SidebarService'
  import store from '../../store'

  let _ = require('lodash')
  export default {
    name: 'Sidebar',
    data () {
      return {
        availableUsers: [],
        onlineUsers: []

      }
    },
    sockets: {
      users: function (data) {
        this.onlineUsers = data.users
      },
      connectedUsers: function (onlineUsers) {
        this.filterOnlineUsers(onlineUsers)
      }
    },
    mounted: function () {
      this.getAllUsers()
    },
    methods: {
      startChatWith: function (userId, socketId) {
        this.$router.push({name: 'Home', params: {uid: userId, socketId: socketId}})
      },
      getAllUsers () {
        let self = this
        SidebarService.getAllUsers()
          .then(function (response) {
            self.availableUsers = response.data
            let loggedInUser = store.state.user
            //Removing myself from the available users
            _.remove(self.availableUsers, {_id: loggedInUser._id})
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      filterOnlineUsers (onlineUsers) {
        this.availableUsers = _.differenceBy(this.availableUsers, onlineUsers, '_id')
        let loggedInUser = store.state.user
        //Removing myself from the online users
        _.remove(onlineUsers, {_id: loggedInUser._id})
        this.onlineUsers = onlineUsers
      }
    }
  }
</script>

<style scoped>

</style>
