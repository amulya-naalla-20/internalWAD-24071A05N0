const http=require("http")
const os=require("os")
const path=require("path")
const EventEmitter=require("events")
const emitter=new EventEmitter()

emitter.on("reqReceived",()=>{
        console.log("Request was received");
})

const server=http.createServer((req,res)=>{
    emitter.emit("reqReceived");

    if(req.url==="/"){
        res.write("Welcome to Home page");
        res.end();
    }else if(req.url=="/os"){
        res.writeHead(200,{"Content-Type":"application/json"});
        const osData={
            platform:os.platform(),
            cpu:os.cpus().length,
            freeMemory:os.freemem(),
            totalMemory:os.totalmem()
        }
        res.end(JSON.stringify(osData));
    }else if(req.url==="/path"){
        const pathData={
            filename:path.basename(__filename),
            dirname:path.dirname(__filename),
            extname:path.extname(__filename)
        }
        res.end(JSON.stringify(pathData));
    }else{
        res.write("404 Not found");
        res.end();
    }
});

server.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
