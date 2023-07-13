function importSideFile() {
  return () => import('@/components/MainSide.vue');
}

function importFooterFile() {
  return () => import('@/components/MainFooter.vue');
}

function importHeaderFile() {
  console.log('importComponentsFile:', 'importHeaderFile');
  return () => import('@/components/MainHeader.vue');
}

function importComponentFile(fileNm, bool = false) {
  let componentFile;
  if (!bool) {
    componentFile = () => import(`@/views/${fileNm}.vue`);
  } else {
    // componentFile = () => import(`@/popup/${fileNm}.vue`);
  }

  return componentFile;
}

function importComponentsFile(fileNm, bool = false) {
  let componentFile = {};
  if (!bool) {
    componentFile.default = () => import(`@/views/${fileNm}.vue`);
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
    router = require(`@/views/${routerNm}.js`);
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
