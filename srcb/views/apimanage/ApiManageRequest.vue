<template>
  <div>
    <!-- 검색필터 영역 -->
    <!-- <div class="search_content"></div> -->
    <!-- //검색필터 영역 -->

    <div class="setting_section">
      <div class="menu_manage_box">
        <div class="content_head">
          <MultiSelect id="" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
        </div>
        <div class="tree_box tree_box_02">
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
        <div class="api_test">
          <MultiSelect id="" style="width: 130px" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
          <input type="text" />
          <button class="btn_save">send</button>
          <button class="btn_save">save</button>
        </div>
        <div class="content_head">
          <div class="align_row">
            <span>파라메터 구분</span>
            <label class="radio_t">
              <input type="radio" name="radio" />
              <span class="checkmark"></span>
              PARAMS
            </label>
            <label class="radio_t">
              <input type="radio" name="radio" />
              <span class="checkmark"></span>
              RAW
            </label>
          </div>
          <div class="btn_box">
            <button class="btn_add">
              <img src="@/assets/img/icon_hori.png" />
              Horizontal Fixation
            </button>
          </div>
        </div>
        <!-- params 선택시 -->
        <div class="table">
          <table>
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 25%" />
              <col style="width: 30%" />
              <col style="width: 30%" />
            </colgroup>
            <thead>
              <tr>
                <th>TYPE</th>
                <th>KEY</th>
                <th>VALUE</th>
                <th>DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <MultiSelect id="" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </td>
                <td>
                  <div class="form_input">
                    <input type="text" class="" style="width: 100%" />
                  </div>
                </td>
                <td>
                  <div class="form_input">
                    <input type="text" class="" style="width: 100%" />
                  </div>
                </td>
                <td>
                  <div class="form_textarea">
                    <textarea class="" name="" id=""></textarea>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <MultiSelect id="" style="width: 100%" v-model="selectValue" :options="selectOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a value"></MultiSelect>
                </td>
                <td>
                  <div class="form_input">
                    <input type="text" class="" style="width: 100%" />
                  </div>
                </td>
                <td>
                  <div class="a-l">
                    <div class="file_regist_box">
                      <div class="btn_regist"><input type="file" ref="files" name="images" @change="getval()" />파일선택</div>
                      <div class="registerd_box" v-for="(name, index) in fileNm" :key="index">{{ name }}<button class="btn_delete_file" @click="deletor(index)"></button></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="form_textarea">
                    <textarea class="" name="" id=""></textarea>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- raw 선택시 -->
        <div class="raw_section">
          <div class="raw_textarea" :class="{ textarea_open: textareaOpen }">
            <textarea name="" id=""></textarea>
          </div>
          <button class="btn_search_content" @click="textareaOpen = !textareaOpen"><i :class="{ close: textareaOpen }"></i></button>
        </div>
        <!-- rersopne -->
        <div class="respone_seciton">
          <div class="content_head">
            <span>RESPONSE</span>
          </div>
          <div class="table" :class="{ respone_open: responeOpen }">
            <table>
              <colgroup>
                <col style="width: 10%" />
                <col style="width: 90%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>1</th>
                  <td></td>
                </tr>
                <tr>
                  <th>2</th>
                  <td></td>
                </tr>
                <tr>
                  <th>3</th>
                  <td></td>
                </tr>
                <tr>
                  <th>4</th>
                  <td></td>
                </tr>
                <tr>
                  <th>5</th>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button class="btn_search_content" @click="responeOpen = !responeOpen"><i :class="{ close: responeOpen }"></i></button>
        </div>
        <!-- 메모 -->
        <div class="memo_seciton">
          <div class="content_head">
            <span>메모</span>
          </div>
          <!-- 메모 리스트 -->
          <div class="memo_list_box">
            <div class="memo_list">
              <span class="memo_txt">파라메터가 추가되었습니다.</span>
              <small class="memo_date">2022.08.12 12:00</small>
              <button class="btn_delete"><i></i></button>
            </div>
            <div class="memo_list">
              <span class="memo_txt">파라메터가 추가되었습니다.파라메터가파라메터가파라메터가 추가되었습니다.</span>
              <small class="memo_date">2022.08.12 12:00</small>
              <button class="btn_delete"><i></i></button>
            </div>
            <div class="memo_list">
              <span class="memo_txt">파라메터가 추가되었습니다.파라메터가 추가되었습니다.파라메터가 추가되었습니다.파라메터가 추가되었습니다.파라메터가 추가되었습니다.파라메터가파라메터가파라메터가파라메터가파라메터가파라메터가 추가되었습니다.</span>
              <small class="memo_date">2022.08.12 12:00</small>
              <button class="btn_delete"><i></i></button>
            </div>
            <div class="memo_list">
              <span class="memo_txt">파라메터가 추가되었습니다.파라메터가 추가되었습니다.파라메터가 추가되었습니다.파라메터가 추가되었습니다.파라메터가 추가되었습니다.파라메터가파라메터가파라메터가파라메터가파라메터가파라메터가 추가되었습니다.</span>
              <small class="memo_date">2022.08.12 12:00</small>
              <button class="btn_delete"><i></i></button>
            </div>
          </div>
          <!-- 메모 작성 -->
          <div class="meno_write_box">
            <div class="form_textarea">
              <textarea></textarea>
            </div>
            <button>등록</button>
          </div>
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
      textareaOpen: false,
      responeOpen: false,
      fileNm: [],
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
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
    getval() {
      // find.getval(this.$refs.files);
      console.log(this.$refs.files);
      if (this.$refs.files && this.$refs.files.files[0]) {
        this.fileNm.push(this.$refs.files.files[0].name);
        var reader = new FileReader();
        reader.readAsDataURL(this.$refs.files.files[0]);
      }
    },
    deletor(index) {
      // find.deletor(id);
      this.fileNm.splice(index, 1);
      this.$refs.files.value = null;
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
