function importSideFile() {
  return () => import('@wb/components/DevSide.vue');
}

function importFooterFile() {
  return () => import('@wb/components/DevFooter.vue');
}

function importHeaderFile() {
  return () => import('@wb/components/DevHeader.vue');
}

function importComponentFile(fileNm, bool = false) {
  let componentFile;
  if (!bool) {
    componentFile = () => import(`@wb/views/${fileNm}.vue`);
  } else {
    // componentFile = () => import(`@/popup/${fileNm}.vue`);
  }

  return componentFile;
}

function importComponentsFile(fileNm, bool = false) {
  let componentFile = {};
  if (!bool) {
    componentFile.default = () => import(`@wb/views/${fileNm}.vue`);
    componentFile.header = importHeaderFile();
    componentFile.footer = importFooterFile();
    componentFile.sideHidenBtn = importSideFile();
  } else {
    // componentFile = () => import(`@/popup/${fileNm}.vue`);
  }

  return componentFile;
}

function importRouterFile(routerNm, bool = false) {
  let router;
  if (!bool) {
    router = require(`@wb/views/${routerNm}.js`);
  } else {
    // router = require(`@/popup/${routerNm}.js`);
  }
  return router.default;
}

export default {
  importComponentFile,
  importComponentsFile,
  importRouterFile,
};
