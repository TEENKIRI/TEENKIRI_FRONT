<template>
  <v-container class="chat-container">
    <v-btn icon @click="closeChat" class="close-button">
      <v-icon>mdi-close</v-icon>
    </v-btn>

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
        <v-btn
          v-if="!isMyMessage(message)"
          icon
          small
          class="report-button"
          @click="reportMessage(message)"
        >
          <v-icon small>mdi-alarm-light-outline</v-icon>
        </v-btn>
        <v-list-item-content>
          <v-list-item-title>{{ message.senderNickname }}</v-list-item-title>
          <v-list-item-subtitle class="message-content">
            {{ filterMessage(message.content) }}
          </v-list-item-subtitle>
          <v-list-item-subtitle
            :class="['message-timestamp', { 'left-align': !isMyMessage(message.senderId) }]"
          >
            {{ formatTime(message.createdTime) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

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

    <ReportCreate
      v-if="showReportModal"
      :chatMessageId="selectedChatMessageId"
      @close="closeReportModal"
    />
  </v-container>
</template>

<script>
import ReportCreate from '@/views/report/ReportCreate.vue';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';

let globalStompClient = null;  // WebSocket 연결 전역 변수

export default {
  data() {
    return {
      messages: [],
      newMessage: '',
      email: localStorage.getItem('email'),
      userId: localStorage.getItem('userId'),
      nickname: localStorage.getItem('nickname'),
      loginTime: new Date().toISOString().slice(0, 19),
      showReportModal: false,
      selectedChatMessageId: null,
      topics: [
        '/topic/korean',
        '/topic/english',
        '/topic/math',
        '/topic/social',
        '/topic/science'
      ],
      topicNames: {
        '/topic/korean': '국어',
        '/topic/english': '영어',
        '/topic/math': '수학',
        '/topic/social': '사회',
        '/topic/science': '과학'
      },
      selectedTopic: '/topic/korean',
      currentSubscription: null,
      forbiddenWords: []
    };
  },
  computed: {
    filteredMessages() {
      const currentChannel = this.selectedTopic.replace('/topic/', '');
      return this.messages.filter(message => message.channel === currentChannel);
    }
  },
  mounted() {
    this.connectWebSocket();  // WebSocket 연결
    this.loadChatHistory();
    this.loadForbiddenWords();
  },
  methods: {
    async loadChatHistory() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/api/chat/messages`,
          { params: { since: this.loginTime } }
        );
        this.messages = response.data;
        this.scrollToBottom();
      } catch (error) {
        console.error('채팅 기록을 불러오는 중 오류 발생:', error);
      }
    },
    async loadForbiddenWords() {
      try {
        const response = await axios.get('/badwords.txt');
        this.forbiddenWords = response.data
          .split('\n')
          .map(word => word.trim())
          .filter(word => word);
        console.log('Loaded forbidden words:', this.forbiddenWords);
      } catch (error) {
        console.error('금지된 단어를 로드하는 중 오류 발생:', error);
      }
    },
    filterMessage(content) {
      this.forbiddenWords.forEach(word => {
        const regex = new RegExp(
          word.split('').map(char => `[${char}]`).join(''),
          'gi'
        );
        content = content.replace(regex, '*'.repeat(word.length));
      });
      return content;
    },
    connectWebSocket() {
      // WebSocket이 이미 연결된 경우 중복 연결 방지
      if (globalStompClient && globalStompClient.connected) {
        console.log('WebSocket 이미 연결됨');
        this.stompClient = globalStompClient;
        this.subscribeToTopic(this.selectedTopic);  // 선택한 채널로 구독만 변경
        return;
      }

      // 하나의 고정된 WebSocket URL로 연결
      const socket = new SockJS(`${process.env.VUE_APP_API_BASE_URL}/ws`);
      globalStompClient = Stomp.over(socket);
      this.stompClient = globalStompClient;

      this.stompClient.connect({}, frame => {
        console.log('WebSocket connected: ' + frame);
        this.subscribeToTopic(this.selectedTopic);  // 선택한 채널 구독
      }, error => {
        console.error('웹소켓 연결 실패:', error);
        setTimeout(() => {
          console.log('웹소켓 재접속...');
          this.connectWebSocket();  
        }, 5000);
      });
    },
    subscribeToTopic(topic) {
      // 기존 구독 해제
      if (this.currentSubscription) {
        this.currentSubscription.unsubscribe();
      }

      this.selectedTopic = topic;

      if (this.stompClient && this.stompClient.connected) {
        // 새로운 채널로 구독
        this.currentSubscription = this.stompClient.subscribe(topic, message => {
          const receivedMessage = JSON.parse(message.body);
          this.messages.push(receivedMessage);
          this.scrollToBottom();  // 메시지가 올 때마다 스크롤 아래로 이동
        });
      }
    },
    sendMessage() {
      if (!this.email) {
        console.error('Email is not available');
        return;
      }

      const channel = this.selectedTopic.replace('/topic/', '');
      if (!channel) {
        console.error('Channel is not set.');
        alert('채널이 설정되지 않았습니다.');
        return;
      }

      if (this.newMessage.trim() === '') {
        alert('메시지를 입력하세요.');
        return;
      }

      if (this.stompClient && this.stompClient.connected) {
        const filteredContent = this.filterMessage(this.newMessage);
        const message = {
          content: filteredContent,
          senderId: this.userId,
          email: this.email,
          channel: channel,
          senderNickname: this.nickname,
        };
        console.log('Sending message:', message);

        // 메시지 전송
        this.stompClient.send(`/app/chat.sendMessage`, {}, JSON.stringify(message));

        this.newMessage = '';  // 메시지 입력창 비우기
        this.scrollToBottom();
      } else {
        console.error('WebSocket 연결이 끊어졌습니다.');
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatBox = this.$el.querySelector('.chat-box');
        if (chatBox) {
          chatBox.scrollTop = chatBox.scrollHeight;
        }
      });
    },
    isMyMessage(message) {  
      if (!message || !message.email) {
        console.error('Message object or email is undefined:', message);
        return false;
      }
      return message.email === this.email;
    },
    formatTime(datetime) {
      const date = new Date(datetime);
      return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    },
    closeChat() {
      console.log('Chat closed');
    },
    reportMessage(message) {
      this.selectedChatMessageId = message.id;
      this.showReportModal = true;
    },
    closeReportModal() {
      this.showReportModal = false;
    }
  },
  components: {
    ReportCreate,
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
