<template>
  <v-container class="chat-container">
    <!-- 닫기 버튼 -->
    <v-btn icon @click="closeChat" class="close-button">
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <!-- 채팅 메시지 리스트 -->
    <v-list class="chat-box">
      <v-list-item
        v-for="message in filteredMessages"
        :key="message.id"
        :class="{
          'my-message': isMyMessage(message),
          'other-message': !isMyMessage(message)
        }"
        class="message-item"
      >
        <v-list-item-content>
          <v-list-item-title>{{ message.senderNickname }}</v-list-item-title>
          <v-list-item-subtitle class="message-content">
            {{ message.content }}
          </v-list-item-subtitle>
          <v-list-item-subtitle
            :class="['message-timestamp', { 'left-align': !isMyMessage(message.senderId) }]"
          >
            {{ formatTime(message.createdTime) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- 메시지 입력 필드 및 전송 버튼 -->
    <div class="message-input-wrapper">
      <v-text-field
        v-model="newMessage"
        label="메시지를 입력하세요..."
        hide-details
        dense
        class="message-input"
        @keyup.enter.prevent="sendMessage"
      ></v-text-field>
      <v-btn @click="sendMessage" class="send-button" color="primary">전송</v-btn>
    </div>

    <!-- 주제 버튼 -->
    <div class="topic-buttons">
      <v-btn
        v-for="topic in topics"
        :key="topic"
        @click="subscribeToTopic(topic)"
        :class="{ 'selected-topic': selectedTopic === topic }"
        class="topic-button"
      >
        {{ topicNames[topic] }}
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';

export default {
  data() {
    return {
      messages: [],
      newMessage: '',
      email: localStorage.getItem('email'),
      userId: localStorage.getItem('userId'),
      nickname: localStorage.getItem('nickname'),
      selectedTopic: '/topic/korean',
      currentSubscription: null,
      stompClient: null,  // WebSocket 연결 상태 관리
      reconnecting: false, // 재연결 여부 상태
      topics: ['/topic/korean', '/topic/english', '/topic/math', '/topic/social', '/topic/science'],
      topicNames: {
        '/topic/korean': '국어',
        '/topic/english': '영어',
        '/topic/math': '수학',
        '/topic/social': '사회',
        '/topic/science': '과학',
      },
    };
  },
  computed: {
    filteredMessages() {
      const currentChannel = this.selectedTopic.replace('/topic/', '');
      return this.messages.filter(message => message.channel === currentChannel);
    }
  },
  mounted() {
    this.connectWebSocket();
    this.loadChatHistory();
  },
  methods: {
    async loadChatHistory() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/chat/messages`, {
          params: { since: new Date().toISOString() }
        });
        this.messages = response.data;
        this.scrollToBottom();
      } catch (error) {
        console.error('채팅 기록을 불러오는 중 오류 발생:', error);
      }
    },
    connectWebSocket() {
      if (this.stompClient && this.stompClient.connected) {
        console.log('WebSocket 이미 연결됨');
        this.subscribeToTopic(this.selectedTopic);
        return;
      }

      const socket = new SockJS(`${process.env.VUE_APP_API_BASE_URL}/ws`);
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect({}, frame => {
        console.log('WebSocket connected: ' + frame);
        this.subscribeToTopic(this.selectedTopic);
      }, error => {
        console.error('웹소켓 연결 실패:', error);
        if (!this.reconnecting) {
          this.reconnecting = true;
          setTimeout(() => {
            console.log('웹소켓 재접속...');
            this.reconnecting = false;
            this.connectWebSocket();
          }, 5000);
        }
      });
    },
    subscribeToTopic(topic) {
      const formattedTopic = `/topic/${topic}`;

      if (this.currentSubscription) {
        this.currentSubscription.unsubscribe();
      }

      this.selectedTopic = topic;

      if (this.stompClient && this.stompClient.connected) {
        this.currentSubscription = this.stompClient.subscribe(formattedTopic, message => {
          const receivedMessage = JSON.parse(message.body);
          this.messages.push(receivedMessage);
          this.scrollToBottom();
        });
      }
    },
    sendMessage() {
      if (!this.email || !this.stompClient || !this.stompClient.connected) {
        console.error('WebSocket 연결이 끊어졌습니다.');
        return;
      }

      const channel = this.selectedTopic.replace('/topic/', '');
      if (this.newMessage.trim() === '') {
        alert('메시지를 입력하세요.');
        return;
      }

      const message = {
        content: this.newMessage,
        senderId: this.userId,
        email: this.email,
        channel: channel,
        senderNickname: this.nickname,
      };

      this.stompClient.send(`/app/chat.sendMessage`, {}, JSON.stringify(message));
      this.newMessage = '';
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatBox = this.$el.querySelector('.chat-box');
        if (chatBox) {
          chatBox.scrollTop = chatBox.scrollHeight;
        }
      });
    }
  }
};
</script>



<style scoped>
.chat-container {
display: flex;
flex-direction: column;
height: 800px;
width: 550px;
margin: 20px auto;
background: #f9f9f9;
border-radius: 8px;
overflow: hidden;
padding: 7px;
position: relative;
}

.close-button {
position: absolute;
top: 10px;
right: 10px;
}

.chat-box {
flex-grow: 1;
padding: 10px;
background: rgb(255, 255, 255);
display: flex;
flex-direction: column;
gap: 15px;
overflow-y: auto;
overflow-x: hidden;
}

.message-item {
display: flex;
align-items: flex-start;
position: relative;
}

.report-button {
position: absolute;
right: -30px;
top: 50%;
transform: translateY(-50%);
width: 40px;
height: 20px;
font-size: 14px;
color: #f44336;
}

.message-input-wrapper {
display: flex;
align-items: center;
border-top: 1px solid #ccc;
padding: 10px;
background: #f9f9f9;
margin-bottom: 0px;
}

.message-input {
flex-grow: 1;
border: none;
padding: 10px;
margin-right: 10px;
height: 40px;
background: #f9f9f9;
}

.send-button {
width: auto;
height: 40px;
padding: 0 15px;
}

.message-wrapper {
display: flex;
flex-direction: column;
position: relative;
max-width: 50%;
}

.message-content {
font-size: 1rem;
white-space: pre-wrap;
word-wrap: break-word;
word-break: break-word;
max-width: 100%;
}

.my-message {
background-color: #ffeb3b;
align-self: flex-end;
text-align: right;
}

.other-message {
background-color: #e5f1fb;
align-self: flex-start;
text-align: left;
}

.message-sender {
font-size: 0.8em;
color: gray;
margin-bottom: 5px;
}

.message-timestamp {
font-size: 0.8em;
color: gray;
margin-top: 5px;
text-align: right;
}

.left-align {
text-align: left !important;
padding-left: 0;
margin-left: 0;
}

.topic-buttons {
display: flex;
justify-content: center;
gap: 10px;
padding: 10px 0;
margin-top: 50px;
margin-bottom: 0px;
background: #f9f9f9;
}

.topic-button {
min-width: 80px;
}

.selected-topic {
background-color: #3f51b5 !important;
color: white !important;
}
</style>
