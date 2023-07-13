<template>
  <div id="container">
    <!-- 컨텐츠 -->
    <div class="body_contents">
      <div id="MainTabS">
        <button class="btn_home" @click="openDash()"><img src="@/assets/img/icon_home_g.png" alt="home" /></button>
        <button class="btn_delete_tab">Delete All</button>

        <ul class="main-tab-menu">
          <li class="main-tab" v-for="(tab, index) in panes" v-bind:class="{ active: currentTab === index }" :key="index">
            <a v-on:click="(currentTab = index), (activeKey = tab.key)">{{ tab.title }}</a>
            <button class="tabs-close-x"></button>
          </li>
        </ul>
        <div v-for="(pane, pIndex) in panes" :key="pIndex">
          <component :is="pane.content" v-show="currentTab === pIndex" />
        </div>
      </div>
      <!-- <a-tabs v-model="activeKey" hide-add type="editable-card" @edit="onEdit" @change="changeComponent()">
        <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
          <component :is="pane.content" />
        </a-tab-pane>
      </a-tabs> -->
      <component :is="main.content" v-show="isMainShow && currentTab === -1" />
      <button class="btn_default" @click="pageMove('/b/login')">Login</button>
      <div class="modal_list_section">
        <button type="primary" @click="productSearch">상품검색</button>
        <ProductSearchModal />
      </div>
    </div>
    <!-- //컨텐츠 -->
  </div>
</template>

<script>
// import GeneralRequest from '@wb/views/GeneralRequest.vue';
import SampleTwo from '@wb/views/SampleTwo.vue';
import DashBoard from '@wb/components/ComponentView1';
import ProductSearchModal from '@wb/components/modal/order/ProductSearchModal'; //상품검색

export default {
  components: {
    SampleTwo,
    DashBoard,
    ProductSearchModal,
  },
  data() {
    const panes = [
      { title: 'Notice', content: 'SampleTwo', key: 'SampleTwo' },
      { title: 'Notice2', content: 'SampleTwo', key: 'SampleTwo' },
    ];
    return {
      activeKey: '',
      panes,
      newTabIndex: 0,
      selected: 'GeneralRequest',
      main: {
        content: 'DashBoard',
        key: 'DashBoard',
      },
      isMainShow: true,
      currentTab: -1,
      tabs: ['Notice', '견적요청', '견적관리'],
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
      console.log('callback', key);
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
    productSearch() {
      this.$modal.show('ProductSearchModal');
    },
  },
};
</script>

<style></style>
