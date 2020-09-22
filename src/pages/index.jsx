import React from 'react';
import styles from './index.less';
const http = require("http")

export default () => {
http.createServer((req, res) => {
    console.log('receive request')
    console.log(req.url)
    if (req.method === 'POST' && req.url === '/') {
        //...
    }
    res.end('ok')
}).listen(3000,()=>{
    console.log('server is ready')
})
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
