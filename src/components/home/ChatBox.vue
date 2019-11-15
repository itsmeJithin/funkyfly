<template>
  <section>
    <div class="card min-h-90vh">
      <!-- Card Header - Dropdown -->
      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between border-0">
        <h6 class="m-0 font-weight-bold text-primary">{{recipient.name}}</h6>
      </div>
      <!-- Card Body -->
      <div class="card-body">
        <div class="chat">
          <!--<template v-for="userMessage in messages"-->
          <!--:key="">-->
          <!--<div class="sender messages">-->
          <!--<div class="message last">-->
          <!--Dude-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="recipient messages">-->
          <!--<div class="message">-->
          <!--Hey!-->
          <!--</div>-->
          <!--<div class="message">-->
          <!--You there?-->
          <!--</div>-->
          <!--<div class="message last">-->
          <!--Hello, how's it going?-->
          <!--</div>-->
          <!--</div>-->
          <!--</template>-->

        </div>
      </div>
      <div class="card-footer">
        <div class="input-group">
          <input type="text" class="form-control bg-light editor-input" placeholder="Enter your message here"
                 v-model="message">
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" v-on:click.prevent="sendMessage">
              Send
              <i class="fas fa-paper-plane fa-sm ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

  import HomeService from '../../pages/home/HomeService'
  import store from '../../store'

  export default {
    name: 'ChatBox',
    props: ['user'],
    data () {
      return {
        message: '',
        messages: [],
        recipient: {},
        socketId: ''
      }
    },
    sockets: {
      receiveMessage (message, sendBy) {
        this.messages = [...this.messages, message]
      },
      messagesent (message) {
        console.log(message)
      }
    },
    methods: {
      sendMessage () {
        let self = this
        let messageObject = {
          message: self.message,
          sender: self.user._id,
          recipient: self.recipient._id
        }
        HomeService.sendMessage(messageObject)
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
        this.message = ''
      }
    },
    mounted () {
      let self = this
      let recipient = this.$route.params.uid
      if (recipient) {
        HomeService.getRecipient(recipient)
          .then(function (response) {
            self.recipient = response.data
            self.recipient.socketId = self.socketId
          })
          .catch(function (error) {
            console.log(error)
          })
        HomeService.getAllConversation()
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    watch: {
      $route (to, from) {
        let self = this
        let recipient = this.$route.params.uid
        this.socketId = this.$route.params.socketId
        if (recipient) {
          HomeService.getRecipient(recipient)
            .then(function (response) {
              self.recipient = response.data
              self.recipient.socketId = self.socketId
            })
            .catch(function (error) {
              console.log(error)
            })
          HomeService.getAllConversation()
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      }
    }
  }
</script>
