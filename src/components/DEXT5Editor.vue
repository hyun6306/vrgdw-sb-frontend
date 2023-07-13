<template>
  <div class="dext5editor">
    <div :id="`componentHolder_${Id}`"></div>
  </div>
</template>
<script>
//import 'babel-polyfill'
//import 'es6-promise/auto'
/* eslint-disable */
export default {
  name: "DEXT5EditorComponent",
  props: {
    Id: String,

    Width: String,
    Height: String,
    Lang: String,
    contents: String,
    page: String
  },
  created() {},
  mounted() {
    let _componentConfig = {
      Id: this.Id,
      EditorHolder: "componentHolder_" + this.Id,
    };

    if (typeof this.Width !== "undefined") {
      _componentConfig.Width = this.Width;
    }
    if (typeof this.Height !== "undefined") {
      _componentConfig.Height = this.Height;
    }
    if (typeof this.Lang !== "undefined") {
      _componentConfig.Lang = this.Lang;
    }

    // DEXT5 Editor Event Define
    _componentConfig.Event = {
      LoadedEvent: this.onCreationCompleteEvent,
    };

    if (typeof DEXT5 == "undefined") {
      this.$loadScript("/dext5editor/js/dext5editor.js")
        .then(() => {
          this._initComponent(_componentConfig);
        })
        .catch(() => {
          // Failed to fetch script
        });
    } else {
      this._initComponent(_componentConfig);
    }
  },
  methods: {
    _initComponent: function (options) {
      if (DEXT5.GetEditorByName(options.Id) !== null) {
        DEXT5.Destroy(options.Id);
      }

      DEXT5.config.EditorHolder = "componentHolder_" + options.Id;
      if (typeof options.Width !== "undefined") {
        DEXT5.config.Width = options.Width;
      }
      if (typeof options.Height !== "undefined") {
        DEXT5.config.Height = options.Height;
      }
      if (typeof options.Lang !== "undefined") {
        DEXT5.config.Lang = options.Lang;
      }
      if (typeof options.Event !== "undefined") {
        DEXT5.config.Event = options.Event;
      }

      new Dext5editor(options.Id);
    },

    // DEXT5 EDITOR Event Re-defined
    onCreationCompleteEvent: function (componentObj) {
      this.setBodyValue(this.contents);
    },

    getBodyValue() {
      return DEXT5.getBodyValue(`${this.page}dext5editor1`);
    },

    setBodyValue(value) {
      return DEXT5.setBodyValue(value,`${this.page}dext5editor1`);
    },

    getImages() {
      let sBodyImage = DEXT5.getImages(`${this.page}dext5editor1`).split('\u000c');
        let sBodyURL = '';
        
        for(let i = 0 ; i < sBodyImage.length; i++) {
            // 이미지당 2개씩 넘어오는 변수를 자릅니다
            sBodyURL = sBodyImage[i].split('\u000b');
            // 이미지 전체경로와 이미지명을 얻을수 있습니다
        }
    },

    getContentUrl() {
       // id가 editor1인 에디터 디자인 영역에서 객체의 경로를 가지고 온 후 '\u000c'로 구분합니다.  
        let sBodyImage = DEXT5.getContentsUrl(`${this.page}dext5editor1`).split('\u000c');
        let sBodyURL = '';
        
        for(let i = 0 ; i < sBodyImage.length; i++) {
            // 객체당 2개씩 넘어오는 변수를 자릅니다
            sBodyURL = sBodyImage[i].split('\u000b');
            // 객체 전체 경로와 객체 명을 얻을 수 있습니다
        }
    },
    setInsertHtml(htmlTag) {
      DEXT5.setInsertHTML(htmlTag, `${this.page}dext5editor1`);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
