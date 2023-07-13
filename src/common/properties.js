const baseObj = {
  baseUrlDev: sessionStorage.getItem('isdev') ? 'http://localhost' : 'https://apidsalesvrgdwdev.dongwha.com',
  baseUrl: sessionStorage.getItem('isdev') ? 'http://localhost' : 'https://apidsalesvrgdw.dongwha.com',
  basePort: sessionStorage.getItem('isdev') ? 8080 : 443,
  reportUrlDev: 'https://reportdsalesvrgdwdev.dongwha.com',
  reportUrl: 'https://reportdsalesvrgdw.dongwha.com',
  // baseUrl: 'http://192.168.0.8',
  // basePort: 8080,
  pageSize: 200,
};

export { baseObj };
