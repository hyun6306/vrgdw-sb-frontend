<template>
  <div id="container">
    <!-- 컨텐츠 -->
    <div class="body_contents">
      <!-- <button class="btn_home" @click="openDash()">
        <img src="@/assets/img/icon_home.png" alt="home" />
      </button>
      <button class="btn_delete_tab">Delete All</button>

      <a-tabs v-model="activeKey" hide-add type="editable-card" @edit="onEdit" @change="changeComponent">
        <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
          <component :is="pane.content" :authButton="pane.authButton" :savePage="pane.savePage" :menuId="pane.menuId" />
        </a-tab-pane>
      </a-tabs> -->
      <!-- 홈버튼 & 열린메뉴탭:S -->
      <div id="MainTabS">
        <!-- <GeneralListGrid @changePage="load" /> -->
        <button class="btn_home" @click="openDash()">
          <img src="@/assets/img/icon_home_g.png" alt="home" />
        </button>
        <button class="btn_delete_tab" @click="deleteTabs(-1)">{{ $t('message.btnAllClose') }}</button>

        <ul class="main-tab-menu">
          <li class="main-tab" v-for="(tab, index) in panes" v-bind:class="{ active: currentTab === index }" :key="index">
            <a v-on:click="(currentTab = index), (activeKey = tab.key)">{{ tab.title }}</a>
            <button class="tabs-close-x" @click="deleteTabs(index)"></button>
          </li>
        </ul>
        <div v-for="(pane, pIndex) in panes" :key="pane.menuId" :class="{ 'none-display': currentTab !== pIndex }">
          <component :is="pane.content" @setNewObject="load" :authButton="pane.authButton" :savePage="pane.savePage" :menuId="pane.menuId" v-show="currentTab === pIndex" :page="pane.page" :openInfo="pane.openInfo" :routerPath="pane.routerPath" />
        </div>
        <div :class="{ 'none-display': !isMainShow && currentTab !== -1 }">
          <component :is="main.content" @loadPage="load" :authButton="main.authButton" :savePage="main.savePage" :page="main.page" :menuId="main.menuId" v-show="isMainShow && currentTab === -1" />
        </div>
      </div>
      <!-- 홈버튼 & 열린메뉴탭:E -->
      <!-- 대시보드 -->
      <!-- <component :is="main.content" :authButton="main.authButton" :savePage="main.savePage" :menuId="main.menuId" v-show="isMainShow && currentTab === -1" /> -->
      <!-- //대시보드 -->
      <!-- <component :is="loadT('devPage/tabTest/SampleOne.vue')" /> -->
      <!-- <button class="btn_default" @click="load()">load</button> -->
    </div>
    <!-- //컨텐츠 -->
    <MainAlarmModal :ment="ment" @okOrNo="okOrNo" />
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { compoentUrl } from '@/consts/componentUrl';
import { componentList } from '@/consts/componentList';
import { loadLanguageAsync } from '@/plugins/i18n';
import MainAlarmModal from '@/modal/main/AlarmModal';
import commonApi from '@/api/common';

export default {
  components: { MainAlarmModal, ...componentList },
  props: {
    choosePage: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      shortUrl: 'userInfo/getShortUrl',
      menuList: 'menuList/getMenuListAll',
    }),
  },
  watch: {
    choosePage() {
      this.load(this.choosePage);
    },
  },
  data() {
    return {
      activeKey: '',
      panes: [],
      newTabIndex: 0,
      selected: '',
      main: {},
      isMainShow: true,
      currentTab: -1,
      maxPanes: 10,
      isIng: false,
      ment: '',
      intervalId: '',
    };
  },
  methods: {
    okOrNo(result) {
      if (result) {
        this.panes = [];
        this.openDash();
      }
    },
    deleteTabs(index) {
      if (index === -1) {
        if (this.panes.length > 0) {
          this.ment = 'message.msgDeleteAllTabs';
          this.$modal.show('MainAlarmModal');
        }
      } else {
        if (index == 'MyProfile') {
          let MyProfileIndex = 0;
          this.panes.forEach((tab, index) => {
            if (tab.routerPath == '/mypage/info') {
              MyProfileIndex = index;
            }
          });
          this.panes.splice(MyProfileIndex, 1);
        } else {
          this.panes.splice(index, 1);
        }
        const length = this.panes.length;
        if (length > 0) {
          if (length === 1) {
            this.currentTab = 0;
          } else {
            if (this.currentTab === index) {
              this.currentTab = length - 1;
            } else if (this.currentTab > index) {
              this.currentTab = this.currentTab - 1;
            }
          }
        } else {
          this.openDash();
        }
      }
    },
    openDash() {
      console.log('HOME:', 'HOME');
      this.isMainShow = true;
      this.currentTab = -1;
    },
    async load(pageObj, id = '', custId = '', etcData = '') {
      console.log('panes:', this.panes);
      console.log('pageObj:', pageObj);
      console.log('pageObj.routerPath:', pageObj.routerPath); //compoentUrl:\src\consts\componentUrl.js 에서 확인
      if (this.maxPanes > this.panes.length) {
        let componentInfo = compoentUrl[pageObj.routerPath];
        if (!componentInfo) {
          this.$EventBus.$emit('openYesModal', this.$t('message.msgNoFrontFile'));
          return;
        }
        let existKey = { key: '', index: -1 };
        this.panes.forEach((pane, index) => {
          if (pane.page === componentInfo.page) {
            existKey = { key: pane.key, index: index };
            pane.openInfo = {
              id,
              custId,
              etcData,
            };
          }
        });

        if (existKey.index === -1) {
          const response = await loadLanguageAsync(pageObj.routerPath, pageObj.menuId);

          const pane = {
            title: pageObj.menuNm,
            content: componentInfo.componentNm,
            key: pageObj.menuId,
            authButton: response.data.rs.button,
            savePage: response.data.rs.savePage,
            menuId: pageObj.menuId,
            routerPath: pageObj.routerPath,
            page: componentInfo.page,
            openInfo: {
              id,
              custId,
              etcData,
            },
          };

          if (pageObj.routerPath !== '/main') {
            this.panes.push(pane);
            this.activeKey = this.panes[this.panes.length - 1].key;
            this.isMainShow = false;
            this.currentTab = this.panes.length - 1;
          } else {
            this.main = pane;
            this.activeKey = this.main.key;
          }
        } else {
          this.activeKey = existKey.key;
          this.currentTab = existKey.index;
          this.isMainShow = false;
        }
        this.selected = componentInfo.page;
      } else if (confirm(`You can open up to ${this.maxPanes}tabs. The first tab disappears.`)) {
        this.panes.splice(0, 1);
        this.load(pageObj, id, custId, etcData);
      }
    },
    changeComponent() {
      this.isMainShow = false;
    },
    onEdit(targetKey, action) {
      this[action](targetKey);
      this.selected = targetKey;
    },
    add() {
      const panes = this.panes;
      const activeKey = `newTab${this.newTabIndex++}`;
      panes.push({
        title: 'New Tab',
        content: 'Content of new Tab',
        key: activeKey,
      });
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
    async getShortUrl() {
      try {
        const param = {
          shortUrl: this.shortUrl,
        };
        const resp = await commonApi.getShortUrl(param);
        let routerPath = resp.data.rs.routerPath;
        let data = JSON.parse(resp.data.rs.paramData);
        let pageObj = this.searchPageObj(routerPath);
        if (!pageObj) {
          this.intervalId = setInterval(this.callLoad, 100, resp);
        } else {
          this.load(pageObj, data.id ? data.id : '', data.custId ? data.custId : '', data);
          this.setShortUrl('');
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
        this.setShortUrl('');
      }
    },
    callLoad(resp) {
      let routerPath = resp.data.rs.routerPath;
      let data = JSON.parse(resp.data.rs.paramData);
      let pageObj = this.searchPageObj(routerPath);
      if (pageObj) {
        this.load(pageObj, data.id ? data.id : '', data.custId ? data.custId : '', data);
        this.setShortUrl('');
        clearInterval(this.intervalId);
      }
    },
    searchPageObj(routerPath) {
      let pageObj;
      this.menuList.forEach(dept1 => {
        if (dept1.routerPath === routerPath) {
          pageObj = dept1;
        }
        dept1.children.forEach(dept2 => {
          if (dept2.routerPath === routerPath) {
            pageObj = dept2;
          }
          dept2.children.forEach(dept3 => {
            if (dept3.routerPath === routerPath) {
              pageObj = dept3;
            }
          });
        });
      });
      return pageObj;
    },
    ...mapMutations('userInfo', ['setShortUrl']),
  },
  mounted() {
    if (this.shortUrl !== '') {
      this.getShortUrl();
    }
  },
  created() {},
};
</script>

<style>
.none-display {
  display: none;
}
</style>
