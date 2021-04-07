else if(pathname=="/web/create_process"){ //create_process 로 접속
    var jsonData = "";  //jsonData => 문자열, 입력한 title, description 저장위함.
    req.on('data', function (chunk) { //req.on('data',) => post data 조각들이 서버에 도착할 때 callback 함수를 실행. chunk => data 조각들 
      jsonData += chunk;    // data조각들을 누적해나감
    })                                 
    req.on('end', function () {         // data 수신이 완료된 후, callback 함수 실행.   
        const partdata = jsonData.split('&description=')   // jsonData를 찢어서 partdata로 설정함. { title, description 으로 나누기위한 1단계 }
        const titledata = partdata[0].split('title=')[1]  // partdata의 'title='뒷부분을 titledata로 설정
        const descriptiondata = partdata[1]                       // partdata에서 'description=' 뒷부분을 descriptiondata로 설정
        var data = fs.readFileSync('./data.json', 'utf8'); // /data.json 파일을 한글형식제공으로 읽어들이고 data 라는 변수로 설정
        const dat = JSON.parse(data);                      // 설정된 data 문자열 전체를 JSON 형식으로 변환함
        dat.push(                         // 사용자가 입력한 title, description을 하나의 객체로 묶어 dat배열에 마지막 부분에 push(삽입) 하기 위해서 쓰여짐
            {
                "title": titledata ,
                "description": descriptiondata
            }                                  // 기존 형식에 맞게 push(삽입)
            )                                  // push(삽입)완료
        const filteredArr = dat.reduce((acc, current) => {     // 빈배열 acc를 설정하고 각 배열의 요소(current)를 반복함 { 중복제거 } => 최종 결과물을 filteredArr[]로 설정 
            const x = acc.find(item => item.title === current.title); // title 찾아 비교 // && item.description === current.description);    // title과 description 요소들을 찾아 비교하여 x라 칭함
            if (!x) {                                 // !x . 비교해서 같지 않다면
                return acc.concat([current]);           // 최근 배열을 누적후 return
            } else {                                  // x . 비교가 같다면 { title이 중복 되었다면 }
                const y = acc.find(item => item.title === current.title && item.description === current.description)  //description 찾아 비교후 같음을 y라 칭함
                const z = acc.find(item => item.title === current.title && item.description != current.description)
            
                console.log(dat[dat.length - 1].title)   // x . title 뽑기
                console.log(current.title)               // x . title 뽑기
                console.log(titledata)
                console.log(dat[dat.length - 1].description)   // x . current.description 뽑기
                console.log(z.description) // x . acc.description 뽑기
                console.log(!y)

                if (z) {              // title같고 . description 같지 않다면  !!! > 내용추가 방향으로 가고싶다!
                    
                                       // 같은 title에 description 추가
                     return acc
                } else{                // title같고 . description 같다면 
                    return acc         // acc return > 
                } 
                                           // return acc.concat();                         // description만 추가해서 return      
            }
          }, []);
        const newdata = JSON.stringify(filteredArr)     // 최종 결과물 filteredArr[]을 JSON형식 문자열로 변환 후 newdata라 칭함
        fs.writeFileSync('./data.json',newdata)         // 문자열 newdata를 ./data.json 파일에 덮어 씌움
        res.statusCode = 302;                           // 서버가 사용자에게 강제로 페이지를 옮기라고 지시하기 위한 statusCode.
        res.setHeader('Location', '/web');              // 강제로 옮겨질 페이지의 주소가 setHeader 매개변수에 쓰여있어야 하며 그 주소는 '/web'임
         res.end();                                      // 종료

    })

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//아래 부분이 ver.1에 포함되어 있는 내용 //
else if(pathname=="/web/create_process"){ //create_process 로 접속
    var jsonData = "";  //jsonData => 문자열, 입력한 title, description 저장위함.
    req.on('data', function (chunk) { //req.on('data',) => post data 조각들이 서버에 도착할 때 callback 함수를 실행. chunk => data 조각들 
      jsonData += chunk;    // data조각들을 누적해나감
    })                                 
    req.on('end', function () {         // data 수신이 완료된 후, callback 함수 실행.   
        const partdata = jsonData.split('&description=')   // jsonData를 찢어서 partdata로 설정함. { title, description 으로 나누기위한 1단계 }
        const titledata = partdata[0].split('title=')[1]  // partdata의 'title='뒷부분을 titledata로 설정
        const descriptiondata = partdata[1]                       // partdata에서 'description=' 뒷부분을 descriptiondata로 설정
        var data = fs.readFileSync('./data.json', 'utf8'); // /data.json 파일을 한글형식제공으로 읽어들이고 data 라는 변수로 설정
        const dat = JSON.parse(data);                      // 설정된 data 문자열 전체를 JSON 형식으로 변환함
        dat.push(                         // 사용자가 입력한 title, description을 하나의 객체로 묶어 dat배열에 마지막 부분에 push(삽입) 하기 위해서 쓰여짐
            {
                "title": titledata ,
                "description": descriptiondata
            }                                  // 기존 형식에 맞게 push(삽입)
            )                                  // push(삽입)완료
        const filteredArr = dat.reduce((acc, current) => {               // 빈배열 acc를 설정하고 각 배열의 요소(current)를 반복함 { 중복제거 } => 최종 결과물을 filteredArr[]로 설정 
            const x = acc.find(item => item.title === current.title && item.description === current.description);    // title과 description 요소들을 찾아 비교하여 x라 칭함
            if (!x) {                           // 다르면
              return acc.concat([current]);     // 최근 배열을 누적
            } else {                                 // 같지 않다면
                return acc ;                      // 
            }
          }, []);
        const newdata = JSON.stringify(filteredArr)     // 최종 결과물 filteredArr[]을 JSON형식 문자열로 변환 후 newdata라 칭함
        fs.writeFileSync('./data.json',newdata)         // 문자열 newdata를 ./data.json 파일에 덮어 씌움
        res.statusCode = 302;                           // 서버가 사용자에게 강제로 페이지를 옮기라고 지시하기 위한 statusCode.
        res.setHeader('Location', '/web');              // 강제로 옮겨질 페이지의 주소가 setHeader 매개변수에 쓰여있어야 하며 그 주소는 '/web'임
         res.end();                                      // 종료
    })
}