const http = require("http")
const { execSync,spawn} = require("child_process")
const fs = require("fs")
const path = require("path")

// 递归删除目录
function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            const curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
function runCommand( cmd, args, callback ){
    var child = spawn( cmd, args );
    var resp = '';
    child.stdout.on('data', function( buffer ){ resp += buffer.toString(); });
    child.stdout.on('end', function(){ callback( resp ) });
}

const resolvePost = req =>
    new Promise(resolve => {
        let chunk = "";
        req.on("data", data => {
            chunk += data;
        });
        req.on("end", () => {
            resolve(JSON.parse(chunk));
        });
    });

http.createServer(async (req, res) => {
    console.log('receive request')
    console.log(req.url)
    if (req.method === 'POST' && req.url === '/') {
        // const data = await resolvePost(req);
        // const projectDir = path.resolve(`./${data.repository.name}`)
        runCommand('sh', ['./deploy.sh'], function( txt ){
            console.log(txt);
          });
        res.end('ok')
    }
}).listen(3000, () => {
    console.log('server is ready')
})
