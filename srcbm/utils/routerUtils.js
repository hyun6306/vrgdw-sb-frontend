// function importSideFile() {
//   return () => import('@mb/components/DevSide.vue');
// }

// function importFooterFile() {
//   return () => import('@mb/components/DevFooter.vue');
// }

// function importHeaderFile() {
//   return () => import('@mb/components/DevHeader.vue');
// }

function importComponentFile(fileNm, bool = false) {
  let componentFile;
  if (!bool) {
    componentFile = () => import(`@mb/views/${fileNm}.vue`);
  } else {
    // componentFile = () => import(`@/popup/${fileNm}.vue`);
  }

  return componentFile;
}

function importComponentsFile(fileNm, bool = false) {
  let componentFile = {};
  if (!bool) {
    componentFile.default = () => import(`@mb/views/${fileNm}.vue`);
    // componentFile.header = importHeaderFile();
    // componentFile.footer = importFooterFile();
    // componentFile.sideHidenBtn = importSideFile();
  } else {
    // componentFile = () => import(`@/popup/${fileNm}.vue`);
  }

  return componentFile;
}

function importRouterFile(routerNm, bool = false) {
  let router;
  if (!bool) {
    router = require(`@mb/views/${routerNm}.js`);
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
