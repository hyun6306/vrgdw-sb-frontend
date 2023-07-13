<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">{{ $t('message.menuGrp') }}</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="selectMenuGrp" :options="menuGrpList" track-by="text" label="text" :searchable="false" :close-on-select="true" :show-labels="false" :allow-empty="false"></MultiSelect>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <div class="setting_section">
      <div class="menu_manage_box">
        <div class="content_head">
          <span class="subTitle">{{ $t('message.manageMenu') }}</span>
          <button class="btn_s_default btn_function m-l-a" @click="setMenu">{{ $t('message.btnSave') }}</button>
          <button class="ml-5 btn_s_default btn_function" @click="add">{{ $t('message.btnAdd') }}</button>
          <!-- <button class="btn_add" @click="saveTree">저장</button> -->
        </div>
        <div class="tree_box">
          <!-- <b-tree-view :data="menuList" :contextMenu="true" @nodeSelect="nodeSelect" :contextMenuItems="contextMenuItems" ref="tree" :nodesDraggable="true" :renameNodeOnDblClick="false" :showIcons="true" iconClassProp="icon" prependIconClass="fas" @contextMenuItemSelect="menuItemSelected"></b-tree-view> -->
          <Tree :value="menuList" draggable droppable @drop="onDragend">
            <div class="tree-node-inbox" slot-scope="{ node, index, path, tree }">
              <button class="btn_tree_head" @click="tree.toggleFold(node, path)">
                <i>{{ node.$folded ? '+' : '-' }}</i>
              </button>
              <span class="depth_icon">
                <!-- 1,2차뎁스 -->
                <img src="@/assets/img/icon_folder_open.png" v-if="node.children.length > 0 && !node.$folded" />
                <img src="@/assets/img/folder_off.png" v-else-if="node.children.length > 0 && node.$folded" />
                <!-- 3차뎁스 -->
                <img src="@/assets/img/icon_paper.png" v-else />
              </span>
              <button class="tree_name" v-if="!node.editable" @click="checkSave(node)">
                {{ node.menuNm }}
              </button>
              <input class="tree_name" v-model="node.menuNm" v-else />
              <button class="btn_tree btn_tree_deit" @click="edit(index, path)">
                <img src="@/assets/img/icon_edit.png" />
              </button>
              <button class="btn_tree btn_tree_remove" @click="checkDelete(node, path, tree)">
                <img src="@/assets/img/icon_delete.png" />
              </button>
              <button class="btn_tree btn_tree_add" @click="addNode(node, path)">
                <img src="@/assets/img/icon_add.png" />
              </button>
            </div>
          </Tree>
        </div>
      </div>
      <div class="program_box">
        <div class="content_head">
          <span class="subTitle">{{ $t('message.progSett') }}</span>
          <button class="btn_s_default btn_critical_process m-l-a" @click="[setMenuDetail(), setMenuBtnAuth()]">{{ $t('message.btnSave') }}</button>
        </div>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 150px" />
              <col style="width: calc(100% - 150px)" />
            </colgroup>
            <tbody>
              <tr>
                <th class="t-l">{{ $t('message.progCd') }}</th>
                <td>
                  <input class="disabled" type="text" disabled placeholder="" v-model="menuDetail.program.progCd" />
                </td>
              </tr>
              <tr>
                <th class="t-l">{{ $t('message.multiLangSett') }}</th>
                <td>
                  <div class="a-l">
                    <div class="form_input">
                      <span class="title-post">{{ $t('message.korMenuNm') }}</span>
                      <input type="text" v-model="menuDetail.korMenuNm" />
                    </div>
                    <div class="form_input">
                      <span class="title-post">{{ $t('message.engMenuNm') }}</span>
                      <input type="text" v-model="menuDetail.engMenuNm" />
                    </div>
                    <div class="form_input">
                      <span class="title-post">{{ $t('message.vnmMenuNm') }}</span>
                      <input type="text" v-model="menuDetail.vnmMenuNm" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="t-l">{{ $t('message.progNm') }}</th>
                <td>
                  <div class="form_input p0">
                    <!-- <input type="text" placeholder="" v-model="menuDetail.program.progNm" /> -->
                    <MultiSelect style="100%;" label="progNm" v-model="selectRouterPath" :options="routerPathList" :close-on-select="true" :show-labels="false" placeholder="" :allow-empty="false" :searchable="true" @input="chooseRouterPath"> </MultiSelect>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="t-l">{{ $t('message.remark') }}</th>
                <td>
                  <div class="form_textarea">
                    <textarea id="" v-model="menuDetail.bigo" placeholder=""></textarea>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="t-l">{{ $t('message.menuIncYn') }}</th>
                <td class="t-l">
                  <div style="width: 40px">
                    <label class="chechbox_solo">
                      <input type="checkbox" v-model="menuDetail.menuIncYn" true-value="Y" false-value="N" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="t-l">{{ $t('message.mobileIncYn') }}</th>
                <td class="t-l">
                  <div style="width: 40px">
                    <label class="chechbox_solo">
                      <input type="checkbox" v-model="menuDetail.mobileIncYn" true-value="Y" false-value="N" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="content_head content_head_secound">
          <span class="subTitle">{{ $t('message.setPermission') }}</span>
        </div>
        <div class="table">
          <table>
            <colgroup>
              <!-- <col style="width: 120px" /> -->
              <!-- <col style="width: 70px" /> -->
              <col style="width: *" />
              <col style="width: *" />
              <col style="width: *" />
              <col style="width: *" />
              <col style="width: *" />
              <col style="width: *" />
              <col style="width: *" />
              <col style="width: *" />
              <col style="width: *" />
            </colgroup>
            <thead>
              <tr>
                <!-- <th>{{ $t('message.authGroup') }}</th> -->
                <!-- <th>{{ $t('message.authCheck') }}</th> -->
                <th>{{ menuBtnAuth.program.schAh || $t('message.inactive') }}</th>
                <th>{{ menuBtnAuth.program.savAh || $t('message.inactive') }}</th>
                <th>{{ menuBtnAuth.program.exlAh || $t('message.inactive') }}</th>
                <th>{{ menuBtnAuth.program.delAh || $t('message.inactive') }}</th>
                <th>{{ menuBtnAuth.program.fn1Ah || $t('message.inactive') }}</th>
                <th>{{ menuBtnAuth.program.fn2Ah || $t('message.inactive') }}</th>
                <th>{{ menuBtnAuth.program.fn3Ah || $t('message.inactive') }}</th>
                <th>{{ menuBtnAuth.program.fn4Ah || $t('message.inactive') }}</th>
                <th>{{ menuBtnAuth.program.fn5Ah || $t('message.inactive') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(btnAuth, index) in menuBtnAuth.list" :key="index">
                <!-- <td>{{ btnAuth.grpAuthCd }}</td> -->
                <!-- <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" v-model="btnAuth.authCheck" true-value="Y" false-value="N" :disabled="menuBtnAuth.program.authCheck === 'N'" />
                    <span class="checkmark"></span>
                  </label>
                </td> -->
                <td>
                  <label class="chechbox_solo" v-if="menuBtnAuth.program.schAh">
                    <input type="checkbox" v-model="btnAuth.schAh" true-value="Y" false-value="N" :disabled="menuBtnAuth.program.schAh === 'N'" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo" v-if="menuBtnAuth.program.savAh">
                    <input type="checkbox" v-model="btnAuth.savAh" true-value="Y" false-value="N" :disabled="menuBtnAuth.program.savAh === 'N'" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo" v-if="menuBtnAuth.program.exlAh">
                    <input type="checkbox" v-model="btnAuth.exlAh" true-value="Y" false-value="N" :disabled="menuBtnAuth.program.exlAh === 'N'" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo" v-if="menuBtnAuth.program.delAh">
                    <input type="checkbox" v-model="btnAuth.delAh" true-value="Y" false-value="N" :disabled="menuBtnAuth.program.delAh === 'N'" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo" v-if="menuBtnAuth.program.fn1Ah">
                    <input type="checkbox" v-model="btnAuth.fn1Ah" true-value="Y" false-value="N" :disabled="menuBtnAuth.program.fn1Ah === 'N'" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo" v-if="menuBtnAuth.program.fn2Ah">
                    <input type="checkbox" v-model="btnAuth.fn2Ah" true-value="Y" false-value="N" :disabled="menuBtnAuth.program.fn2Ah === 'N'" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo" v-if="menuBtnAuth.program.fn3Ah">
                    <input type="checkbox" v-model="btnAuth.fn3Ah" true-value="Y" false-value="N" :disabled="menuBtnAuth.program.fn3Ah === 'N'" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo" v-if="menuBtnAuth.program.fn4Ah">
                    <input type="checkbox" v-model="btnAuth.fn4Ah" true-value="Y" false-value="N" :disabled="menuBtnAuth.program.fn4Ah === 'N'" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo" v-if="menuBtnAuth.program.fn5Ah">
                    <input type="checkbox" v-model="btnAuth.fn5Ah" true-value="Y" false-value="N" :disabled="menuBtnAuth.program.fn5Ah === 'N'" />
                    <span class="checkmark"></span>
                  </label>
                </td>
              </tr>
              <!-- <tr>
                <td>{{ $t('message.baseAuth') }}</td>
                <td>
                  <label class="chechbox_solo" v-if="menuBtnAuth.program.schAh">
                    <input type="checkbox" v-model="menuBtnAuth.program.authCheck" true-value="Y" false-value="N" disabled />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" v-model="menuBtnAuth.program.schAh" true-value="Y" false-value="N" disabled />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" v-model="menuBtnAuth.program.savAh" true-value="Y" false-value="N" disabled />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" v-model="menuBtnAuth.program.exlAh" true-value="Y" false-value="N" disabled />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" v-model="menuBtnAuth.program.delAh" true-value="Y" false-value="N" disabled />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" v-model="menuBtnAuth.program.fn1Ah" true-value="Y" false-value="N" disabled />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" v-model="menuBtnAuth.program.fn2Ah" true-value="Y" false-value="N" disabled />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" v-model="menuBtnAuth.program.fn3Ah" true-value="Y" false-value="N" disabled />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" v-model="menuBtnAuth.program.fn4Ah" true-value="Y" false-value="N" disabled />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" v-model="menuBtnAuth.program.fn5Ah" true-value="Y" false-value="N" disabled />
                    <span class="checkmark"></span>
                  </label>
                </td>
              </tr> -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <AlarmModal :ment="ment" @okOrNo="okOrNo" :whatIs="whatIs" />
  </div>
</template>

<script>
import commonApi from '@/api/common';
import systemApi from '@/api/system/system';
import AlarmModal from '@/modal/order/AlarmModal';

// import { bTreeView } from 'bootstrap-vue-treeview';

import ItemTemplate from './ItemTemplate.vue';

// import * as hp from 'helper-js';

import 'he-tree-vue/dist/he-tree-vue.css';
import { Tree, Draggable, Fold } from 'he-tree-vue';

export default {
  name: 'MenuGroup',
  components: {
    // bTreeView,
    Tree: Tree.mixPlugins([Draggable, Fold]),
    AlarmModal,
  },
  data() {
    return {
      treeData: [
        { text: 'node 1', children: [] },
        { text: 'node 2', children: [{ text: 'node 2-1', children: [] }] },
      ],
      selectMenuGrp: '',
      value: [],
      template: ItemTemplate,
      menuGrpList: [],
      menuList: [],
      backMenuList: [],
      selectedNode: [],
      menuDetail: { program: {}, multiLanguageJson: {} },
      allRouterPathList: [],
      routerPathList: [],
      selectRouterPath: null,
      menuBtnAuth: { program: {}, list: [] },
      existNewNode: 0,
      saveDeleteData: {},
      ment: '',
      whatIs: '',
      authGrpList: [],
      grpAuthCdList: {},
    };
  },
  watch: {
    selectMenuGrp() {
      this.menuDetail = {};
      this.menuDetail.program = {};
      this.menuBtnAuth.program = {};
      this.menuBtnAuth.list = [];
      this.selectRouterPath = null;
      this.existNewNode = 0;
      this.getMenuList();
    },
  },
  computed: {
    grpAuthCd() {
      return this.grpAuthCdList[this.selectMenuGrp.value];
    },
  },
  methods: {
    checkDelete(node, path, tree) {
      let data = tree.getNodeByPath(path);
      if (!data.id || data.id === '') {
        tree.removeNodeByPath(path);
      } else {
        this.saveDeleteData = {
          node,
          path,
          tree,
        };
        this.ment = 'message.msgDeleteMenu';
        this.whatIs = 'delete';
        this.$modal.show('OrderAlarmModal');
      }
    },
    checkSave(node) {
      if (this.existNewNode != 0) {
        this.ment = 'message.msgAddNewMenu';
        this.whatIs = 'save';
        this.$modal.show('OrderAlarmModal');
      } else {
        this.getMenuInfo(node);
      }
    },
    okOrNo(result, whatIs) {
      if (result && whatIs === 'delete') {
        this.removeNodeByPath();
      } else if (!result && whatIs === 'delete') {
        this.saveDeleteData = {};
      } else if (result && whatIs === 'save') {
        this.setMenu();
      }
    },
    onDragend(store) {
      const { dragNode } = store;
      const { targetPath } = store;
      const targetPathLength = targetPath.length;
      if (targetPathLength > 3) {
        this.menuList = JSON.parse(JSON.stringify(this.backMenuList));
        return;
      } else if (targetPathLength === 3) {
        if (dragNode.children.length !== 0) {
          this.menuList = JSON.parse(JSON.stringify(this.backMenuList));
          return;
        }
      } else if (targetPathLength === 2) {
        for (let i = 0; i < dragNode.children.length; i++) {
          if (dragNode.children[0].children.length > 0) {
            this.menuList = JSON.parse(JSON.stringify(this.backMenuList));
            return;
          }
        }
      }
      let dept1 = 0;
      let dept2 = -1;
      targetPath.forEach((path, index) => {
        if (index === 0) {
          dept1 = path;
        } else if (index === 1) {
          dept2 = path;
        }
      });
      let parentId = '';

      if (targetPathLength === 1) {
        parentId = '';
        this.menuList.forEach((dept, index) => {
          dept.sort = index;
        });
      } else if (targetPathLength === 2) {
        parentId = this.menuList[dept1].id;
        this.menuList[dept1].children.forEach((dept2, index) => {
          dept2.sort = index;
        });
      } else if (targetPathLength === 3) {
        parentId = this.menuList[dept1].children[dept2].id;
        this.menuList[dept1].children[dept2].children.forEach((dept3, index) => {
          dept3.sort = index;
        });
      }
      dragNode.parentId = parentId;
      dragNode.level = targetPathLength - 1;
      this.backMenuList = JSON.parse(JSON.stringify(this.menuList));
    },
    edit(index, path) {
      let isEditEnd = false;
      if (path.length === 1) {
        isEditEnd = this.menuList[path[0]].editable;
        this.menuList[path[0]].editable = !this.menuList[path[0]].editable;
        this.menuList[path[0]].korMenuNm = this.menuList[path[0]].menuNm;
      } else if (path.length === 2) {
        isEditEnd = this.menuList[path[0]].children[path[1]].editable;
        this.menuList[path[0]].children[path[1]].editable = !this.menuList[path[0]].children[path[1]].editable;
        this.menuList[path[0]].children[path[1]].korMenuNm = this.menuList[path[0]].children[path[1]].menuNm;
      } else if (path.length === 3) {
        isEditEnd = this.menuList[path[0]].children[path[1]].children[path[2]].editable;
        this.menuList[path[0]].children[path[1]].children[path[2]].editable = !this.menuList[path[0]].children[path[1]].children[path[2]].editable;
        this.menuList[path[0]].children[path[1]].children[path[2]].korMenuNm = this.menuList[path[0]].children[path[1]].children[path[2]].menuNm;
      }

      if (isEditEnd) {
        this.setMenu();
      }

      this.menuList = JSON.parse(JSON.stringify(this.menuList));
      this.backMenuList = JSON.parse(JSON.stringify(this.menuList));
    },
    add() {
      const nodeData = {
        menuGrpCd: this.selectMenuGrp.value,
        level: 0,
        sort: this.menuList.length + 1,
        korMenuNm: `New Node`,
        engMenuNm: '',
        vnmMenuNm: '',
        parentId: '',
        children: [],
      };
      this.menuList.push(nodeData);
      this.existNewNode++;
    },
    removeNodeByPath() {
      this.saveDeleteData.node.children.forEach(dept2 => {
        if (dept2.children.length > 0) {
          dept2.children.forEach(dept3 => {
            if (!dept3.id) {
              this.existNewNode--;
            }
          });
        }
        if (!dept2.id) {
          this.existNewNode--;
        }
      });
      if (!this.saveDeleteData.node.id) {
        this.existNewNode--;
      }

      this.saveDeleteData.tree.removeNodeByPath(this.saveDeleteData.path);
      this.setMenu(this.saveDeleteData.node);
      this.saveDeleteData = {};
    },
    addNode(node, path) {
      if (path.length > 2) {
        this.$EventBus.$emit('openYesModal', 'message.msgNoAddSubMenu');
      } else {
        let sort = 0;
        let parentId = '';
        if (path.length === 2) {
          if (this.menuList[path[0]].children[path[1]].children.length > 0) {
            let childLength = this.menuList[path[0]].children[path[1]].children.length;
            sort = this.menuList[path[0]].children[path[1]].children[childLength - 1].sort + 1;
            parentId = this.menuList[path[0]].children[path[1]].children[childLength - 1].parentId;
          }
        } else if (path.length === 1) {
          if (this.menuList[path[0]].children.length > 0) {
            let childLength = this.menuList[path[0]].children.length;
            sort = this.menuList[path[0]].children[childLength - 1].sort + 1;
            parentId = this.menuList[path[0]].children[childLength - 1].parentId;
          }
        }
        const nodeData = {
          menuGrpCd: this.selectMenuGrp.value,
          level: path.length,
          sort: sort,
          menuNm: `new Node`,
          korMenuNm: `New Node`,
          engMenuNm: '',
          vnmMenuNm: '',
          parentId: parentId,
          children: [],
        };
        node.children.push(nodeData);
        this.existNewNode++;
      }
    },
    async getRouterPathList(filter = '') {
      try {
        const param = {
          filter,
        };
        const resp = await systemApi.getRouterPathList(param);
        this.allRouterPathList = resp.data.ds;
        this.routerPathList = this.allRouterPathList;
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getCommonCodeCombo(groupCd) {
      try {
        const param = {
          groupCd,
          useYn: 'Y',
          prntCd: '',
        };
        const resp = await commonApi.getCommonCodeCombo(param);
        if (groupCd === 'MENU_GROUP') {
          this.menuGrpList = resp.data.ds;
          if (this.menuGrpList.length > 0 && this.selectMenuGrp === '') {
            this.selectMenuGrp = this.menuGrpList[0];
          }
        } else if (groupCd === 'AUTH_GROUP') {
          this.authGrpList = resp.data.ds;
        }
        this.setGrp();
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    setGrp() {
      const grpAuthCdList = {
        SYSTEM_MANAGER: 'ROLE_ADMIN', // 관리자
        VRGDW_SALES: 'ROLE_SALES', // 영업사원
        VRGDW_SUPPORT: 'ROLE_SALES', //영업지원
        VRGDW_SNOP: 'ROLE_SALES', // S&OP
        VRGDW_TRAN: 'ROLE_SALES', // 물류
        VRGDW_QA: 'ROLE_SALES', // QA
        TRANSCUS: 'ROLE_USER', // 운송사
        CUSTOMER: 'ROLE_USER', // 고객사
        CAR_DRIVER: 'ROLE_USER', // 배송기사
      };
      if (this.menuGrpList.length > 0 && this.authGrpList.length > 0) {
        if (this.menuGrpList.some(list => !list.data1.includes('ROLE'))) {
          this.grpAuthCdList = grpAuthCdList;
        } else {
          let grpAuthCdList = {};
          this.menuGrpList.forEach(menu => {
            this.authGrpList.forEach(auth => {
              if (menu.data1 === auth.value) grpAuthCdList[menu.value] = auth.value;
            });
          });
          this.grpAuthCdList = grpAuthCdList;
        }
      }
    },
    async getMenuList() {
      try {
        const param = {
          menuGrpCd: this.selectMenuGrp.value,
        };
        const resp = await systemApi.getMenuList(param);
        this.menuList = resp.data.ds;
        this.menuList.forEach(list => {
          list.editable = false;
        });
        this.backMenuList = JSON.parse(JSON.stringify(this.menuList));
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    getMenuInfo(node) {
      this.menuDetail = { program: {}, multiLanguageJson: {} };
      this.menuBtnAuth = { program: {}, list: [] };
      this.selectRouterPath = null;
      this.getMenuDetail(node.menuId);
      this.getMenuButtonAuth(node.menuId);
    },
    async getMenuDetail(menuId) {
      try {
        const param = {
          menuId,
        };
        const resp = await systemApi.getMenuDetail(param);

        if (resp.data.program) {
          this.menuDetail = resp.data;
        } else {
          this.menuDetail = {
            ...resp.data,
            program: {},
          };
        }

        this.allRouterPathList.forEach(list => {
          if (this.menuDetail.program.progPh === list.progPh) {
            this.selectRouterPath = list;
          }
        });
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    async getMenuButtonAuth(menuId) {
      try {
        const param = {
          menuId,
          grpAuthCd: this.grpAuthCd,
        };
        const resp = await systemApi.getMenuButtonAuth(param);
        if (resp.data.program) {
          this.menuBtnAuth = resp.data;
          if (this.menuBtnAuth.list.length === 0) {
            this.menuBtnAuth.list = [{ grpAuthCd: this.grpAuthCd }];
          }
        }
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    // saveTree() {
    //   this.setMenu();
    // },
    async setMenu(deletedNode = {}) {
      try {
        this.menuList.forEach(list => {
          if (!list.parentId) {
            list['parentId'] = '';
          }
        });
        const param = {
          list: this.menuList,
          deletedList: [deletedNode],
        };
        const resp = await systemApi.setMenu(param);
        this.$EventBus.$emit('openYesModal', resp.data.message);
        this.existNewNode = 0;
        this.getCommonCodeCombo();
        this.getMenuList();
      } catch (e) {
        console.log(e);
        if (e && e.err && e.err.data && e.err.data.message) {
          this.$EventBus.$emit('openYesModal', e.err.data.message);
        } else {
          this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
        }
      }
    },
    validation() {
      if (!this.menuDetail.menuId || this.menuDetail.menuId === '') {
        this.$EventBus.$emit('openYesModal', 'message.msgChooseMenu');
        return false;
      } else if (!this.menuDetail.korMenuNm || this.menuDetail.korMenuNm === '') {
        this.$EventBus.$emit('openYesModal', 'message.msgValidKor');
        return false;
      } else if (!this.menuDetail.engMenuNm || this.menuDetail.engMenuNm === '') {
        this.$EventBus.$emit('openYesModal', 'msgValidEng');
        return false;
      } else if (!this.menuDetail.vnmMenuNm || this.menuDetail.vnmMenuNm === '') {
        this.$EventBus.$emit('openYesModal', 'msgValidVnm');
        return false;
      } else if ((Object.keys(this.menuBtnAuth.program).length > 0 && !this.menuDetail.program.progCd) || this.menuDetail.program.progCd === '') {
        this.$EventBus.$emit('openYesModal', 'msgValidProgNm');
        return false;
      } else if ((Object.keys(this.menuBtnAuth.program).length > 0 && !this.menuDetail.program.progNm) || this.menuDetail.program.progNm === '') {
        this.$EventBus.$emit('openYesModal', 'msgValidProgNm');
        return false;
      } else {
        return true;
      }
    },
    async setMenuDetail() {
      if (this.menuDetail.menuId && this.validation()) {
        try {
          const param = {
            menuId: this.menuDetail.menuId,
            korMenuNm: this.menuDetail.korMenuNm,
            engMenuNm: this.menuDetail.engMenuNm,
            vnmMenuNm: this.menuDetail.vnmMenuNm,
            bigo: this.menuDetail.bigo ? this.menuDetail.bigo : '',
            progCd: this.menuDetail.program.progCd,
            progNm: this.menuDetail.program.progNm,
            menuIncYn: this.menuDetail.menuIncYn ? this.menuDetail.menuIncYn : 'N',
            mobileIncYn: this.menuDetail.mobileIncYn ? this.menuDetail.mobileIncYn : 'N',
          };
          const resp = await systemApi.setMenuDetail(param);
          this.$EventBus.$emit('openYesModal', resp.data.message);
          // this.setMenu();
          this.getMenuList();
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data && e.err.data.message) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          } else {
            this.$EventBus.$emit('openYesModal', 'message.msgSystemError');
          }
        }
      }
    },
    async setMenuBtnAuth() {
      if (this.validation()) {
        try {
          const param = [];

          this.menuBtnAuth.list.forEach(list => {
            const paramHeader = list.id;
            delete list['id'];
            param.push({
              ...paramHeader,
              ...list,
              menuId: this.menuDetail.menuId,
            });
            list['id'] = paramHeader;
          });
          await systemApi.setMenuBtnAuth(param);
          // this.$EventBus.$emit('openYesModal', resp.data.message);
        } catch (e) {
          console.log(e);
          if (e && e.err && e.err.data) {
            this.$EventBus.$emit('openYesModal', e.err.data.message);
          }
        }
      }
    },
    chooseRouterPath() {
      if (this.selectRouterPath) {
        this.menuDetail.program = JSON.parse(JSON.stringify(this.selectRouterPath));
        this.menuBtnAuth.program = JSON.parse(JSON.stringify(this.selectRouterPath));
        this.menuBtnAuth.list = [{ grpAuthCd: this.grpAuthCd }];
      } else {
        this.menuDetail.program = {};
        this.menuBtnAuth.program = {};
        this.menuBtnAuth.list = [];
      }
    },
  },
  created() {
    this.getCommonCodeCombo('MENU_GROUP');
    this.getCommonCodeCombo('AUTH_GROUP');
    this.getRouterPathList();
  },
  destroyed() {},
};
</script>

<style></style>
