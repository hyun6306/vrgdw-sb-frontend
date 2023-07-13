function importComponentFile(fileNm, bool = false) {
  let componentFile;
  if (!bool) {
    componentFile = () => import(`@m/views/${fileNm}.vue`);
  } else {
    // componentFile = () => import(`@/popup/${fileNm}.vue`);
  }

  return componentFile;
}

function importComponentsFile(fileNm, bool = false) {
  let componentFile = {};
  if (!bool) {
    componentFile.default = () => import(`@m/views/${fileNm}.vue`);
  } else {
    // componentFile = () => import(`@/popup/${fileNm}.vue`);
  }

  return componentFile;
}

function importRouterFile(routerNm, bool = false) {
  let router;
  if (!bool) {
    router = require(`@m/views/${routerNm}.js`);
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
