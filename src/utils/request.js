// 
export default function request(url, {
  method = "GET", // GET, POST, PUT, DELETE, etc.
  // Custom:
  responseType = "json", 
  signal, 
  ...etc
} = {}){
  return new Promise((resolve, reject) => {
    if(!url){
      reject(new Error('url not define'));
      return;
    }

    fetch(url, {
      ...etc, 
      method, 
      signal, 
    })
    .then(res => {
      if (!res.ok) {
        reject(new Error('Network response was not OK'));// throw 
        return;
      }

      let contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('/' + responseType)) {
        reject(new TypeError("responseType not " + responseType));// throw 
        return;
      }
      return res[responseType]();
    })
    .then(data => {
      data ? resolve(data) : reject(new Error('Data not available'));
    })
    .catch(reject);
  });
}