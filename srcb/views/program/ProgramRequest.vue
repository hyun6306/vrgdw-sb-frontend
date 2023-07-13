<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">메뉴 그룹</span>
              <MultiSelect id="Material_Group" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <div class="setting_section">
      <div class="menu_manage_box">
        <div class="content_head">
          <span class="content_title">메뉴관리</span>
          <button class="btn_add" @click="add">저장</button>
          <button class="btn_add ml-5" @click="add">추가</button>
        </div>
        <div class="tree_box">
          <Tree :value="treeData" draggable droppable>
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
              <button class="tree_name" v-if="!node.editable">{{ node.text }}</button>
              <input class="tree_name" v-model="node.text" v-else />
              <button class="btn_tree btn_tree_deit" @click="edit(node, index, path, tree)"><img src="@/assets/img/icon_edit.png" /></button>
              <button class="btn_tree btn_tree_remove" @click="removeNodeByPath(path, tree)"><img src="@/assets/img/icon_delete.png" /></button>
              <button class="btn_tree btn_tree_add" @click="addNode(node, path)"><img src="@/assets/img/icon_add.png" /></button>
            </div>
          </Tree>
        </div>
      </div>
      <div class="program_box">
        <div class="content_head">
          <span class="content_title">프로그램 설정</span>
          <button class="btn_save">저장</button>
        </div>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 150px" />
              <col style="width: calc(100% - 150px)" />
            </colgroup>
            <tbody>
              <tr>
                <th class="t-l">프로그램 코드</th>
                <td>
                  <input class="disabled" type="text" disabled placeholder="Quotation_Code" />
                </td>
              </tr>
              <tr>
                <th class="t-l">다국어 설정</th>
                <td>
                  <div class="a-l">
                    <div class="form_input">
                      <span class="title-post">한국어</span>
                      <input type="text" disabled class="disabled" />
                    </div>
                    <div class="form_input">
                      <span class="title-post">영어</span>
                      <input type="text" disabled class="disabled" />
                    </div>
                    <div class="form_input">
                      <span class="title-post">베트남어</span>
                      <input type="text" disabled class="disabled" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="t-l">프로그램 명</th>
                <td>
                  <div class="form_input p0">
                    <!-- <input type="text" disabled class="disabled" placeholder="견적요청" /> -->
                    <v-autocomplete :keep-open="true" :items="pathList" v-model="selectPath" :get-label="getLabel" :component-item="template" @change="updateItems"> </v-autocomplete>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="t-l">비고</th>
                <td>
                  <div class="form_textarea">
                    <textarea name="" id="" disabled class="disabled" placeholder=""></textarea>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="t-l">메뉴 포함 여부</th>
                <td class="t-l">
                  <div style="width: 40px">
                    <label class="chechbox_solo">
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="content_head content_head_secound">
          <span class="content_title">프로그램 설정</span>
        </div>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 120px" />
              <col style="width:200px:" />
              <col style="width: 70px" />
              <col style="width: 70px" />
              <col style="width: 70px" />
              <col style="width: 70px" />
              <col style="width: 70px" />
              <col style="width: 70px" />
              <col style="width: 70px" />
              <col style="width: 70px" />
              <col style="width: 70px" />
              <col style="width: 70px" />
            </colgroup>
            <thead>
              <tr>
                <th>권한그룹</th>
                <th>권한그룹명</th>
                <th>권한체크</th>
                <th>조회</th>
                <th>저장</th>
                <th>엑셀</th>
                <th>삭제</th>
                <th>FN1</th>
                <th>FN2</th>
                <th>FN3</th>
                <th>FN4</th>
                <th>FN5</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>30001</td>
                <td>영업담당자 그룹</td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
              </tr>
              <tr>
                <td>30001</td>
                <td>영업담당자 그룹</td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
              </tr>
              <tr>
                <td>30001</td>
                <td>영업담당자 그룹</td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as hp from 'helper-js';

import 'he-tree-vue/dist/he-tree-vue.css';
import { Tree, Draggable, Fold } from 'he-tree-vue';

import ItemTemplate from '@/views/system/ItemTemplate';

export default {
  components: {
    //CustomerOrderGrid,
    //DatePickerModal,
    Tree: Tree.mixPlugins([Draggable, Fold]),
  },
  data() {
    return {
      template: ItemTemplate,
      selectValue: '',
      selectOptions: ['Select option', 'options', 'selected'],
      search_box_height: '',
      options: [
        {
          language: 'JavaScript',
          library: 'Vue.js',
        },
        {
          language: 'JavaScript',
          library: 'Vue-Multiselect',
        },
        {
          language: 'JavaScript',
          library: 'Vuelidate',
        },
      ],
      value: [],
      treeData: [
        { text: 'node 1', children: [] },
        { text: 'node 2', children: [{ text: 'node 2-1', children: [] }] },
      ],
      allPathList: [{ progNm: 'test' }, { progNm: 'eric' }, { progNm: 'avery' }],
      pathList: [],
      selectPath: null,
    };
  },
  methods: {
    getInfoHeight() {
      let val = this.$refs.search_box_height.scrollHeight;
      // search_box_height 의 높이값 받아온다
      this.search_box_height = `${val}px`;
    },
    edit(node, index, path, tree) {
      console.log('node', node);
      console.log('index', index);
      console.log('path', path);
      console.log('tree', tree);
      if (path.length === 1) {
        this.treeData[path[0]].editable = !this.treeData[path[0]].editable;
      } else if (path.length === 2) {
        this.treeData[path[0]].children[path[1]].editable = !this.treeData[path[0]].children[path[1]].editable;
      } else if (path.length === 3) {
        this.treeData[path[0]].children[path[1]].children[path[2]].editable = !this.treeData[path[0]].children[path[1]].children[path[2]].editable;
      }

      this.treeData = JSON.parse(JSON.stringify(this.treeData));
    },
    add() {
      this.treeData.push({ text: `node ${hp.randString(3).toLowerCase()}`, children: [] });
    },
    removeNodeByPath(path, tree) {
      tree.removeNodeByPath(path);
    },
    addNode(node, path) {
      console.log(node);
      if (path.length > 2) {
        alert('최대 Dept는 3입니다.');
      } else {
        node.children.push({ text: `node ${hp.randString(3).toLowerCase()}`, children: [] });
      }
    },
    getLabel(item) {
      if (item) {
        return item.progNm;
      }
    },
    updateItems(text) {
      this.pathList = this.allPathList.filter(list => {
        return list.progNm.includes(text);
      });
    },
  },
  created() {
    this.treeData.forEach(list => {
      list.editable = false;
    });
    for (let a = 0; a < 20; a++) {
      this.allPathList.push({ progNm: 'qwert' + a });
    }

    this.pathList = this.allPathList;
  },
  mounted() {
    // this.getInfoHeight();
  },
  destroyed() {},
};
</script>

<style></style>
