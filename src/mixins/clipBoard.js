export function writeTextClipboard(text) {
  return new Promise((resolve, reject) => {
    if (!navigator.clipboard) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        resolve();
      } catch (err) {
        reject(err);
      }

      document.body.removeChild(textArea);
      return;
    }

    navigator.clipboard.writeText(text).then(
      function () {
        resolve();
      },
      function (err) {
        reject(err);
      },
    );
  });
}
