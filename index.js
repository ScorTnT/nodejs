const http = require('http');
const url = require('url');
const fs  = require('fs');

let app = http.createServer(function(req, res){   // app 선언 및 createServer함수 실행
    const pathname = url.parse(req.url,false).pathname  // pathname 으로 url 받아들이기 위한 설정
    if(pathname=="/web"){                            // /web 으로 들어오면

        const queryObject = url.parse(req.url,true).query; 

        var data = fs.readFileSync('./data.json', 'utf8');
        const dat = JSON.parse(data);

        let litag = ""
        dat.map(function(item, idx){
            litag +=  `
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
                        <a href="/web/create"><button type="button">Create!</button></a>
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
                    <a href="/web/create"><button type="button">Create!</button></a>

                </body>
            </html>
            `)

        }
        
    }

    else if(pathname=="/web/create") {
        res.end(`
        <html>
            <body>
            <form action="/web/create_process" method="post">
            <h3>Title</h3>
            <input type="text" name="title"><br/><br/>
            <h3>Description</h3>
            <input type="text" name="description">
            <input type="submit" value="Submit">
            </form>
            </body>
        </html>
        `)
    }

    else if(pathname=="/web/create_process"){ //create_process 로 접속

        var jsonData = "";  //jsonData => 문자열, 입력한 title, description 저장위함.
        req.on('data', function (chunk) { //req.on('data',) => post data 조각들이 서버에 도착할 때 callback 함수를 실행. chunk => data 조각들 
          jsonData += chunk;    // data조각들을 누적해나감
        })                                 
        req.on('end', function () {         // data 수신이 완료된 후, callback 함수 실행.   
            const partdata = jsonData.split('&description=')   // jsonData를 찢어서 partdata로 설정함. { title, description 으로 나누기위한 1단계 }
            const titledata = partdata[0].split('title=')[1]  // partdata의 'title='뒷부분을 titledata로 설정
            const desdata = partdata[1]                       // partdata에서 'description=' 뒷부분을 desdata로 설정

            var data = fs.readFileSync('./data.json', 'utf8'); // /data.json 파일을 한글형식제공으로 읽어들이고 data 라는 변수로 설정
            const dat = JSON.parse(data);                      // 설정된 data 문자열 전체를 JSON 형식으로 변환함

            dat.push(                         // 사용자가 입력한 title, description을 하나의 객체로 묶어 dat배열에 마지막 부분에 push(삽입) 하기 위해서 쓰여짐
                {
                    "title": titledata ,
                    "description": desdata
                }                                  // 기존 형식에 맞게 push(삽입)
                )                                  // push(삽입)완료

            const filteredArr = dat.reduce((acc, current) => {               // 빈배열 acc를 설정하고 각 배열의 요소(current)를 반복함 { 중복제거 } => 최종 결과물을 filteredArr[]로 설정 
                const x = acc.find(item => item.title === current.title );   // title이 같으면 ; > 내용만 추가하기 위함.  // && item.description === current.description);    // title과 description 요소들을 찾아 비교하여 x라 칭함
                if (x) {                           // 비교해서 같다면
                  return acc.concat([current]);     // 최근 배열을 누적
                } 
                else {                                 //같지 않다면
                    return acc.concat([current]);      // 누적 return      
                }
                
              }, []);
              console.log(current)

            const newdata = JSON.stringify(filteredArr)     // 최종 결과물 filteredArr[]을 JSON형식 문자열로 변환 후 newdata라 칭함
            fs.writeFileSync('./data.json',newdata)         // 문자열 newdata를 ./data.json 파일에 덮어 씌움

            res.statusCode = 302;                           // 서버가 사용자에게 강제로 페이지를 옮기라고 지시하기 위한 statusCode.
	        res.setHeader('Location', '/web');              // 강제로 옮겨질 페이지의 주소가 setHeader 매개변수에 쓰여있어야 하며 그 주소는 '/web'임
 	        res.end();                                      // 종료

        })
    

    }



    else {
        return res.writeHead(404)
    }


});


app.listen(3000);
