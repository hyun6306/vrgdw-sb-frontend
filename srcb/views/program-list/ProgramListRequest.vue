<template>
  <div>
    <!-- 검색필터 영역 -->
    <div class="search_content">
      <div class="search_box">
        <div class="search_box_filter">
          <div class="filter_list">
            <label for="" class="filter_type">
              <span class="filter_type_title">검색어</span>
              <input type="text" id="postal_code" style="" class="t-r" placeholder="000000" />
              <button class="btn_search"><img src="@/assets/img/icon_search_w.png" /></button>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- //검색필터 영역 -->

    <div class="setting_section">
      <div class="program_box">
        <div class="content_head">
          <span class="content_title">프로그램 목록</span>
          <div class="btn_box">
            <button class="btn_add">추가</button>
            <button class="btn_add">삭제</button>
            <button class="btn_save">저장</button>
          </div>
        </div>
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 40px" />
              <col style="width: 40px" />
              <col style="width: 150px" />
              <col style="width: 250px" />
              <col style="width: 60px" />
              <col style="width: 60px" />
              <col style="width: 60px" />
              <col style="width: 60px" />
              <col style="width: 60px" />
              <col style="width: 60px" />
              <col style="width: 60px" />
              <col style="width: 60px" />
              <col style="width: 60px" />
              <col style="width: 60px" />
              <col style="width: 220px" />
            </colgroup>
            <thead>
              <tr>
                <th>NO</th>
                <th>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </th>
                <th>프로그램명</th>
                <th>경로</th>
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
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input">
                    <input type="text" class="" style="width: 100%" />
                  </div>
                </td>
                <td>
                  <div class="form_input">
                    <input type="text" class="t-l" style="width: 100%" />
                  </div>
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
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td class="t-l">비고</td>
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
//import { Tree, Draggable, Fold } from 'he-tree-vue';

import ItemTemplate from '@/views/system/ItemTemplate';

export default {
  components: {
    //CustomerOrderGrid,
    //DatePickerModal,
    //Tree: Tree.mixPlugins([Draggable, Fold]),
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
