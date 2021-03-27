const http = require('http');
const url = require('url');
const fs  = require('fs');

let app = http.createServer(function(req, res){

    
    if(req.url.includes("/web")){

        const queryObject = url.parse(req.url,true).query;

        var data = fs.readFileSync('./data.json', 'utf8');
        const dat = JSON.parse(data);

        let litag = ""
        dat.map(function(item, idx){
            litag += `
            <li><a href="/web?id=${idx}">${item.title}</a></li>
            `
        })


        if(queryObject.id==undefined){
            res.end(`
                <html>
                    <head>
                        <title>WEB1 - Welcome</title>
                        <meta charset="utf-8">

                    </head>
                    <body>
                        <h1><a href="/web">WEB</a></h1>
                        <ol>
                          ${litag}
                        </ol>
                        <h2>WEB</h2>
                        <p>The World Wide Web (abbreviated WWW or the Web) is an information space where documents and other web resources are identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and can be accessed via the Internet.[1] English scientist Tim Berners-Lee invented the World Wide Web in 1989. He wrote the first web browser computer program in 1990 while employed at CERN in Switzerland.[2][3] The Web browser was released outside of CERN in 1991, first to other research institutions starting in January 1991 and to the general public on the Internet in August 1991.
                        </p>
                    </body>
                </html>
            `);
        }
        else {
            const title = dat[queryObject.id].title
            const description = dat[queryObject.id].description

            res.end(`            
            <html>
                <head>
                    <title>WEB1 - ${title} </title>
                    <meta charset="utf-8">

                </head>
                <body>
                    <h1><a href="/web">WEB</a></h1>
                    <ol>
                    ${litag}
                    </ol>
                    <h2>${title}</h2>
                    <p>${description}
                    </p>
                </body>
            </html>
            `)

        }
        
    }



    else {
        return res.writeHead(404)
    }


});


app.listen(3000);
