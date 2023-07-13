<template>
  <div>
    <!-- 검색필터 영역 -->
    <!-- <div class="search_content"></div> -->
    <!-- //검색필터 영역 -->

    <div class="setting_section">
      <div class="language_box">
        <p class="language_box_title">라우터 주소 등록</p>
        <div class="language_box_search">
          <input type="text" />
          <button class="btn_default btn_black">검색</button>
          <button class="btn_default btn_white">검색 초기화</button>
          <button class="btn_default btn_white">삭제</button>
        </div>
        <div class="table bottom_line">
          <table>
            <colgroup>
              <col style="width: 50px" />
              <col style="width: 50px" />
              <col style="width: 150px" />
              <col style="width: " />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </th>
                <th>No</th>
                <th>라우터 명</th>
                <th>라우터 Path</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>1</td>
                <td class="t-l">엑셀업로드</td>
                <td class="t-l">/modal/excelUploadModal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="language_box language_box04">
        <!-- <p class="language_box_title">단어사전</p> -->
        <div class="table pa-01">
          <table>
            <colgroup>
              <col style="width: 100px" />
              <col style="width: " />
              <col style="width: 100px" />
              <col style="width: " />
            </colgroup>
            <tbody>
              <tr>
                <th class="essential" style="display: table-cell">라우터명</th>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
                <th class="essential" style="display: table-cell">라우터 Path</th>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="language_box_search_02 pa-02">
          <button class="btn_default btn_black">추가</button>
          <button class="btn_default btn_white">삭제</button>
        </div>
        <div class="table tabel_650 bottom_line pa-03">
          <table>
            <colgroup>
              <col style="width: 50px" />
              <col style="width: 200px" />
              <col style="width: " />
            </colgroup>
            <tbody>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="chechbox_solo">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div class="form_input"><input type="text" /></div>
                </td>
                <td class="t-l">
                  <div class="form_input"><input type="text" style="width: 100%" /></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="language_box_search_02 pa-04">
          <button class="btn_default btn_black">저장</button>
          <button class="btn_default btn_white">초기화</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as hp from 'helper-js';

export default {
  components: {
    //CustomerOrderGrid,
    //DatePickerModal,
  },
  data() {
    return {
      //template: ItemTemplate,
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
