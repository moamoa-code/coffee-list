const body = document.getElementsByTagName("body")[0];
const coffee_list = document.querySelector(".coffee_list");

//html2canvas를 이용한 스크린샷 저장
function bodyShot(capture_target) {
  let ct = coffee_list;
  if(capture_target==='coffee_list'){
      ct = coffee_list;
  }
   //전체 스크린 샷하기 
   //html2canvas(document.body) //document에서 body 부분을 스크린샷을 함. 
  html2canvas(ct)
  .then( function (canvas) { 
       //canvas 결과값을 drawImg 함수를 통해서 //결과를 canvas 넘어줌. //png의 결과 값 
       //drawImg(canvas.toDataURL('image/png')); 
       //appendchild 부분을 주석을 풀게 되면 body //document.body.appendChild(canvas); 
       //특별부록 파일 저장하기 위한 부분. 
      saveAs(canvas.toDataURL(), 'file-name.png'); 
      }).catch(function (err) { 
          console.log(err); 
      }); 
  } 
function saveAs(uri, filename) { 
  var link = document.createElement('a'); 
  if (typeof link.download === 'string') { 
      link.href = uri; link.download = filename; 
      document.body.appendChild(link); 
      link.click(); 
      document.body.removeChild(link); 
  } else { window.open(uri); } 
}

// JSON 불러오기
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}

// readTextFile("coffee-2022-temp.json", function(text){
//   const coffee = JSON.parse(text);
//   //console.log(coffee);
//   paintCoffee(coffee);
// });

/*paint로 그린 리스트 전부 삭제*/
function erase(){

}

//JSON 리스트1
function coffee(){
  erase();
  readTextFile("coffee-2022-temp.json", function(text){
      const coffee = JSON.parse(text);
      paintCoffee(coffee);
  })
}


function paintCoffee(coffee){
  coffee.map((data) =>{
    // 컨테이너 박스
    const coffee_container = document.createElement('div'); 
    coffee_container.setAttribute("class","coffee_container");

    // 이름
    const title = document.createElement("span");
    title.setAttribute("class","title");
    const txt_title = document.createTextNode(data.title);
    title.appendChild(txt_title)

    // 커피설명
    const desc = document.createElement("span");
    desc.setAttribute("class","desc");
    const txt_desc = document.createTextNode(data.desc);
    desc.appendChild(txt_desc)

    //국기 이미지
    const flag_box = document.createElement("div");
    flag_box.setAttribute("class","flag_box");
    const flag_image = document.createElement("img");
    if (data.flag !== null && data.flag !== ""){
      flag_image.setAttribute("src","imgs/" + data.flag);
      flag_box.appendChild(flag_image);
    }

    //테이스트노트
    const taste_title = document.createElement("span");
    taste_title.setAttribute("class","taste_title");
    taste_title.appendChild(document.createTextNode('TASTING NOTES'))

    //테이스트노트 내용
    const taste_box = document.createElement("div");
    taste_box.setAttribute("class","taste_box");
    const taste = document.createElement("span");
    taste.appendChild(document.createTextNode(data.taste));
    taste_box.appendChild(taste);

    //산미-바디 밸런스
    const balance_box = document.createElement("div");
    balance_box.setAttribute("class","balance_box");
    const balance = document.createElement("span");
    balance.appendChild(document.createTextNode(data.balance));
    balance_box.appendChild(balance);

    //아이콘
    const icon_box = document.createElement("div");
    icon_box.setAttribute("class","icon_box");
    const icon1 = document.createElement("img");
    const icon2 = document.createElement("img");
    const icon3 = document.createElement("img");
    if (data.icon1 !== null && data.icon1 !== ""){
      icon1.setAttribute("src","imgs/" + data.icon1);
      icon_box.appendChild(icon1);
    }
    if (data.icon2 !== null && data.icon2 !== ""){
      icon2.setAttribute("src","imgs/" + data.icon2);
      icon_box.appendChild(icon2);
    }
    if (data.icon3 !== null && data.icon3 !== ""){
      icon3.setAttribute("src","imgs/" + data.icon3);
      icon_box.appendChild(icon3);
    }

    //베스트
    if(data.isBest === 'Y') {
      const best_box = document.createElement("div");
      best_box.setAttribute("class","best_box");
      const best_img = document.createElement("img");
      best_img.setAttribute("src","imgs/best.png");
      best_box.appendChild(best_img);
      coffee_container.appendChild(best_box);
    }


    coffee_container.appendChild(title);
    coffee_container.appendChild(desc);
    if (data.flag !== null && data.flag !== ""){
      coffee_container.appendChild(flag_box);
    }
    coffee_container.appendChild(taste_title);
    coffee_container.appendChild(taste_box);
    coffee_container.appendChild(balance_box);
    coffee_container.appendChild(icon_box);
    coffee_list.appendChild(coffee_container);
  });
}



coffee();