<template>
  <div id="container">
    <!-- 컨텐츠 -->
    <div class="body_contents">
      <div id="MainTabS">
        <button class="btn_home" @click="openDash()"><img src="@/assets/img/icon_home.png" alt="home" /></button>
        <button class="btn_delete_tab">Delete All</button>

        <ul class="main-tab-menu">
          <li class="main-tab" v-for="(tab, index) in panes" v-bind:class="{ active: currentTab === index }" :key="index">
            <a v-on:click="(currentTab = index), (activeKey = tab.key)">{{ tab.title }}</a>
            <button class="tabs-close-x"></button>
          </li>
        </ul>
        <div v-for="(pane, pIndex) in panes" :key="pIndex" :class="{ 'none-display': currentTab !== pIndex }">
          <component :is="pane.content" v-show="currentTab === pIndex" />
        </div>
      </div>
      <component :is="main.content" v-show="isMainShow && currentTab === -1" />
    </div>
    <!-- //컨텐츠 -->
  </div>
</template>
<script>
import SampleTwo from '@wb/views/SampleTwo.vue';
import DashBoard from '@wb/components/ComponentView1';
import ReleaseStateRequest from '@wb/views/release-state/ReleaseStateRequest.vue';

export default {
  components: { ReleaseStateRequest, SampleTwo, DashBoard },
  data() {
    const panes = [
      { title: '출고 상태조회', content: 'ReleaseStateRequest', key: 'ReleaseStateRequest' },
      { title: 'Notice', content: 'SampleTwo', key: 'SampleTwo' },
    ];
    return {
      activeKey: panes[0].key,
      panes,
      newTabIndex: 0,
      selected: 'ReleaseStateRequest',
      isMainShow: true,
      currentTab: 0,
      main: {
        content: 'DashBoard',
        key: 'DashBoard',
      },
    };
  },
  methods: {
    openDash() {
      this.isMainShow = true;
      this.currentTab = -1;
    },
    changeComponent() {
      //   this.selected = 'SampleTwo';
      // console.log(this.activeKey);
      // this.selected = this.activeKey;
      this.isMainShow = false;
    },
    callback(key) {
      console.log(key);
    },
    onEdit(targetKey, action) {
      this[action](targetKey);
      this.selected = targetKey;
      console.log(this.selected);
    },
    add() {
      const panes = this.panes;
      const activeKey = `newTab${this.newTabIndex++}`;
      panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
      this.panes = panes;
      this.activeKey = activeKey;
    },
    remove(targetKey) {
      let activeKey = this.activeKey;
      let lastIndex;
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.panes.filter(pane => pane.key !== targetKey);
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key;
        } else {
          activeKey = panes[0].key;
        }
      }
      this.panes = panes;
      this.activeKey = activeKey;
    },
    pageMove(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style></style>
