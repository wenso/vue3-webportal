<template>
  <el-container class="wenso-app-container">
    <!--公共侧栏-->
    <ViewAside />
    <el-container class="wenso-main-wrap">
      <!--公共头部-->
      <el-header class="wenso-header">
        <ViewHeader />
      </el-header>
      <!--内容区域-->
      <el-main class="wenso-main">
        <ViewMain />
      </el-main>
    </el-container>
  </el-container>
</template>


<script setup>
  import ViewMain from "./components/ViewMain";
  import ViewHeader from "./components/ViewHeader";
  import ViewAside from "./components/ViewAside";
  import {inject, ref} from "vue";
  if($SETTINGS.socket.enable){
    const socket=inject("socket");
    let message = ref();
    let logger=ref(null);

    socket.on('connect', function(data) {
      output('<span class="connect-msg">Client connect to the server!'+ data +' </span>');
    });
    socket.on('message', function(data) {
      output('<span class="username-msg">' + data + ':</span> ');
    });

    socket.on('broadcast', function(data) {
      output('<span class="username-msg">' + data + ':</span> ');
    });
    socket.on('disconnect', function(data) {
      output(data+'<span class="disconnect-msg">The client has disconnected!</span>');
    });

    const  handleDisconnect=()=> {
      socket.disconnect();
    }

    const handleSendMessage=() =>{
      //socket.emit('message', {userName: userName, message: message});
      socket.emit('message', message);
    }

    const handleSendBroadcast=() =>{
      //socket.emit('broadcast', {userName: userName, message: message});
      socket.emit('broadcast', message);
    }
    const output=(element,message)=> {
      //let currentTime = "<span class='time'>" +  time.format('HH:mm:ss.SSS') + "</
      let time = new Date().getTime();
      let msgObj = "<div>" + time + " " + message + "</div>";
      logger.value.appendChild(msgObj);
    }
  }
</script>

<style scoped>
.wenso-app-container{ height:100vh;}
.wenso-header{ padding:0; background: white; height: 72px; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 0 3px 0 rgba(0,0,0,0.4);}
.wenso-app-wrap{ width: 100vw;height:100vh }
.wenso-main{ min-width: 1280px; height: 100%; background: #F2F8FF; padding: 0; }
</style>