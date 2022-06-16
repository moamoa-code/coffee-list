const coffee_list = document.querySelector(".coffee_list");
const coffee_single_list = document.querySelector(".coffee_single_list");
const coffee_special_list = document.querySelector(".coffee_special_list");
const coffee_list_400 = document.querySelector(".coffee_list_400");
const coffee_list_1000 = document.querySelector(".coffee_list_1000");
const banner_400g = document.querySelector(".banner_400g");
const banner_1kg = document.querySelector(".banner_1kg");
const image_view = document.querySelector(".image_view");
const image_view_container = document.querySelector(".image_view .container");
const capture_area = document.querySelector(".capture_area");
const yeca_area = document.querySelector(".yeca_area");

const body = document.getElementsByTagName("body")[0];
const banner_blend = document.querySelector(".banner_blend");
const banner_single = document.querySelector(".banner_single");
const contents_container = document.querySelector(".contents_container");
const button_780px = document.querySelector(".button_780px");

let isYeca = false;


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

readTextFile("coffee.json", function(text){
        const coffee = JSON.parse(text);
        //console.log(coffee);
        paintCoffee(coffee);
});


/*paint로 그린 리스트 전부 삭제*/
function erase(){
    while(coffee_list.hasChildNodes()){
        coffee_list.removeChild(coffee_list.lastChild);
    }
    while(coffee_single_list.hasChildNodes()){
        coffee_single_list.removeChild(coffee_single_list.lastChild);
    }
}

//html2canvas를 이용한 스크린샷 저장
function bodyShot(capture_target) {
    console.log(capture_target);
    let ct = coffee_list;
    if(capture_target==='body'){
        ct = capture_area;
    }else if (capture_target==='yeca'){
        ct = yeca_area;
    }else if (capture_target==='yeca_400g'){
        ct = coffee_list_400;
    }else if (capture_target==='yeca_1kg'){
        ct = coffee_list_1000;
    }else if (capture_target==='blend'){
        ct = coffee_list;
    }else if (capture_target==='single'){
        ct = coffee_single_list;
    }else if (capture_target==='special'){
        ct = coffee_special_list;
    }
     //전체 스크린 샷하기 
     //html2canvas(document.body) //document에서 body 부분을 스크린샷을 함. 
     html2canvas(ct) //document에서 body 부분을 스크린샷을 함. 
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

/* 세팅 */

//예카용 프리셋
function button_yeca_clicked(){
    isYeca = true;
    erase();
    readTextFile("coffee2.json", function(text){
        const coffee = JSON.parse(text);
        paintCoffee(coffee);
        yecaSizing();
        button_price_clicked();
    });
}

//JSON 리스트1
function button_list1_clicked(){
    erase();
    readTextFile("coffee.json", function(text){
        const coffee = JSON.parse(text);
        paintCoffee(coffee);
    })
}
//JSON 리스트2
function button_list2_clicked(){
    erase();
    readTextFile("coffee2.json", function(text){
        const coffee = JSON.parse(text);
        console.log(coffee);
        paintCoffee(coffee);
    })
}

//크기조절 780 버튼
function button_780px_clicked(){
    body.style.width="780px";
    banner_blend.style.width="780px"
    banner_single.style.width="780px"
    coffee_list.style.width="780px"
    coffee_single_list.style.width="780px"
    
    let contents_container = document.querySelectorAll('.contents_container');
    console.log(contents_container);
    for (let elem of contents_container) {
        elem.style.width="530px";
    }
}

//크기조절 900 버튼
function button_900px_clicked(){
    body.style.width="900px";
    banner_blend.style.width="900px"
    banner_single.style.width="900px"
    coffee_list.style.width="900px"
    coffee_single_list.style.width="900px"
    let contents_container = document.querySelectorAll('.contents_container');
    console.log(contents_container);
    for (let elem of contents_container) {
        elem.style.width="650px";
    }
}

//크기조절 예카전용
function yecaSizing(){
    body.style.width="780px";
    banner_blend.style.width="780px";
    banner_single.style.width="780px";
    coffee_list.style.width="780px";
    coffee_single_list.style.width="780px";

    const number = document.querySelectorAll(".number");
    for (let elem of number) {
        elem.style.fontSize="26pt";
    }
    const number_box = document.querySelectorAll(".number_box");
    for (let elem of number_box) {
        elem.style.backgroundColor = "#24a7e1";
    }
    const title = document.querySelectorAll(".title");
    for (let elem of title) {
        elem.style.fontSize="20pt";
    }
    const left_container = document.querySelectorAll(".left_container");
    for (let elem of left_container) {
        elem.style.width="220px";
    }
    const img_box = document.querySelectorAll(".img_box");
    for (let elem of img_box) {
        elem.style.width="220px";
    }
    // const img_box_img = document.querySelectorAll(".img_box img");
    // for (let elem of img_box_img) {
    //     elem.style.width="220px";
    // }
    let contents_container = document.querySelectorAll('.contents_container');
    console.log(contents_container);
    for (let elem of contents_container) {
        elem.style.width="560px";
    }
}

//가격표 보이기/숨기기 토글 버튼
function button_price_clicked(){
    let price_container = document.querySelectorAll('.price_container');
    for (let elem of price_container){
        elem.classList.toggle('show_price');
    }
}

//애니메이션 off
function button_animation_clicked(){
    window.removeEventListener('scroll', handleScroll);
    const elems = document.querySelectorAll('.up-on-scroll');
    elems.forEach(element => {
        element.style.opacity = "1";   
        element.style.transform = 'translateY(0px)';
    });
}

//세팅창 숨기기
function button_hide_clicked(){
    const div = document.querySelector('.setting');
    div.classList.toggle('hide');
}


//바디감,산미 그래프 그리기
function paintGraph(span,data){
    for(var i = 0; i < data; i++){
        span.innerText += '■';
    }
    for(var i = 0; i < 10-data; i++){
        span.innerText += '□';
    }
}


//커피사진 팝업창 보이기
function hideImage(){
    image_view.classList.remove('show');
    while(image_view_container.hasChildNodes()){
        image_view_container.removeChild(image_view_container.firstChild);
    }
}

function paintCoffee(coffee){
    return new Promise(function(resolve, reject) {
        coffee.map((data) =>{
            //각 항목의 컨테이너
            const coffee_container = document.createElement('div');
            coffee_container.setAttribute("class","coffee_container up-on-scroll");

            //좌측컨테이너 - 커피사진, 로스팅포인트, 스트렝스
            const left_container = document.createElement("div");
            left_container.setAttribute("class", "left_container");

            //커피 사진
            const img_box = document.createElement("div");
            img_box.setAttribute("class","img_box");
            
            //구분선
            //const line = document.createElement("hr");
            const line_inner = appendElement("div","","line_inner");
            const line = appendElement("div","","line");
            line.appendChild(line_inner);

            const coffee_image = document.createElement('img');
            if (data.image === null || data.image === ""){
                coffee_image.setAttribute("src","imgs/test.png");
            }else{
                coffee_image.setAttribute("src","imgs/" + data.image);
            }
            //커피사진 팝업창
            coffee_image.addEventListener('click', function () {
                const img = document.createElement("img");
                img.setAttribute("src","imgs/" + data.image);
                img.addEventListener('click',hideImage);
                image_view_container.appendChild(img);
                image_view.classList.add('show');
            });

            //스트렝스
            const strTag = document.createElement("div");
            strTag.append("Strength")
            strTag.setAttribute("class","strTag");
            const str_box = document.createElement("div");
            str_box.setAttribute("class","str_box");
            if (data.color !== null && data.color !== ""){
                str_box.style.backgroundColor = data.color;
            }
            const str = document.createElement("span");
            str.setAttribute("class","str");
            const data_str = document.createTextNode(data.str);
            str.appendChild(data_str);
            str_box.appendChild(str);

            //로스팅포인트
            const roasting_box = document.createElement("div");
            const roastingTag = document.createElement("p");
            roastingTag.setAttribute("class","roastingTag");
            roastingTag.append("roast")
            roasting_box.setAttribute("class","roasting_box");
            const roasting = document.createElement("span");
            roasting.setAttribute("class","roasting");
            const data_roasting = document.createTextNode(data.roasting);
            roasting.appendChild(data_roasting);
            roasting_box.appendChild(roasting);
            roasting_box.appendChild(roastingTag);
            
            //우측 컨테이너
            const contents_container = document.createElement("div");
            contents_container.setAttribute("class","contents_container");

            //제품명 컨테이너 = (번호 + 국기 + 타이틀)
            const title_container = document.createElement("div");
            title_container.setAttribute("class","title_container");

            //옵션번호
            const number_box = document.createElement("div");
            number_box.setAttribute("class","number_box");
            if (data.color !== null && data.color !== ""){
                number_box.style.backgroundColor = data.color;
            }
            const number = document.createElement("h1");
            number.setAttribute("class","number");
            if (data.number <= 9){
                number.append("0"+data.number);
            }else{
                number.append(data.number);
            }
            number_box.appendChild(number);

            //국기 이미지
            const flag_box = document.createElement("div");
            flag_box.setAttribute("class","flag_box");
            const flag_image = document.createElement("img");
            if (data.flag !== null && data.flag !== ""){
                flag_image.setAttribute("src","imgs/" + data.flag);
                flag_box.appendChild(flag_image);
            }

            //타이틀(제품명)
            const title = appendElement("h2",data.title,"title");
            //예카일 경우 번호 앞에 "선택" 붙임
            if (isYeca == true){
                const yecaNumber = appendElement("span","선택 ","yecaNumber");
                title_container.appendChild(yecaNumber);
            }
            title_container.appendChild(number_box);
            if (data.flag != null && data.flag != ""){
                title_container.appendChild(flag_box);
            }
            title_container.appendChild(title);

            //가격/용량
            const price_container = document.createElement('div');
            price_container.setAttribute("class","price_container");
            const freeShipping = appendElement("span","무료배송","freeShipping");
            const yeca = appendElement("span","예카공구가","yeca");
            const price = appendElement("span",data.price.toLocaleString(),"price");
            const weight = appendElement("span","("+data.weight+")","weight");
            const krw = appendElement("span","원","krw");
            price_container.appendChild(freeShipping);
            price_container.appendChild(yeca);
            price_container.appendChild(weight);
            price_container.appendChild(price);
            price_container.appendChild(krw);

            //제품설명
            const desc = appendElement("span", data.desc, "desc");

            //테이스트노트
            const taste = appendElement("h3", data.taste, "taste");        

            //산미
            const acid = document.createElement("h1");
            const acidTag = document.createElement("h3");
            acidTag.setAttribute("class","acidTag");
            acidTag.append("산미 ");
            const data_acid = document.createTextNode(data.acid);
            const outOfTen = document.createElement("span");
            outOfTen.setAttribute("class","outOfTen");
            outOfTen.innerText='/10 ';

            //산미 그래프
            const acid_graph = document.createElement("span");
            acid.setAttribute("class","acid");
            const acid_graph_container = document.createElement("div");
            acid_graph_container.setAttribute("class","graph_container");
            acid_graph.setAttribute("class","acid_graph");
            acid.appendChild(data_acid);
            paintGraph(acid_graph,data.acid);
            acid_graph_container.appendChild(acid_graph);

            //바디감
            const bodies = document.createElement("h1");
            const bodiesTag = document.createElement("h3");
            bodiesTag.setAttribute("class","bodiesTag");
            bodiesTag.append("바디 ");
            const data_bodies = document.createTextNode(data.bodies);
            bodies.setAttribute("class","bodies");
            const outOfTen2 = document.createElement("span");
            outOfTen2.setAttribute("class","outOfTen");
            outOfTen2.innerText='/10 ';

            //바디감 그래프
            const bodies_graph = document.createElement("span");
            const bodies_graph_container = document.createElement("div");
            bodies_graph_container.setAttribute("class","graph_container");
            bodies_graph.setAttribute("class","bodies_graph");
            bodies.appendChild(data_bodies);
            paintGraph(bodies_graph,data.bodies);
            bodies_graph_container.appendChild(bodies_graph);

            //왼쪽 컨테이너
            left_container.appendChild(img_box);
            left_container.appendChild(str_box);
            left_container.appendChild(strTag);
            left_container.appendChild(roasting_box);
            img_box.appendChild(coffee_image);
            // contents_container.appendChild(number_box);
            // if (data.flag != null && data.flag != ""){
            //     contents_container.appendChild(flag_box);
            // }
            // contents_container.appendChild(title);
            //오른쪽 내용 컨테이너
            contents_container.appendChild(title_container);
            contents_container.appendChild(price_container);
            contents_container.appendChild(desc);
            contents_container.appendChild(taste);
            contents_container.appendChild(acidTag);
            contents_container.appendChild(acid);
            contents_container.appendChild(outOfTen);
            contents_container.appendChild(acid_graph_container);
            contents_container.appendChild(bodiesTag);
            contents_container.appendChild(bodies);
            contents_container.appendChild(outOfTen2);
            contents_container.appendChild(bodies_graph_container);

            coffee_container.appendChild(left_container);
            coffee_container.appendChild(contents_container);

            if(data.cat==="싱글"){
                coffee_single_list.appendChild(coffee_container);
                coffee_single_list.appendChild(line);
            }else if(data.cat==="블랜드"){
                coffee_list.appendChild(coffee_container);
                coffee_list.appendChild(line);
            }else if(data.cat==="400g"){
                coffee_list_400.appendChild(coffee_container);
                coffee_list_400.appendChild(line);
                banner_400g.style.display = "block";
            }else if(data.cat==="1kg"){
                coffee_list_1000.appendChild(coffee_container);
                coffee_list_1000.appendChild(line);
                banner_1kg.style.display = "block";
            }else if(data.cat==="스페셜티"){
                coffee_special_list.appendChild(coffee_container);
                coffee_special_list.appendChild(line);
            }
            
        })
        resolve();
    })
}

//엘리먼트 만들기
function appendElement(elemName, nodeContent, className){
    const elem = document.createElement(elemName);
    const data = document.createTextNode(nodeContent);
    elem.setAttribute("class", className);
    elem.appendChild(data);
    return elem;
}

//스크롤시 항목 나타나는 애니메이션
//https://blueshw.github.io/2019/10/13/show-items-on-scroll/
function isElementUnderBottom(elem, triggerDiff) {
    const { top } = elem.getBoundingClientRect();
    const { innerHeight } = window;
    return top > innerHeight + (triggerDiff || 0);
}

function handleScroll() {
    const elems = document.querySelectorAll('.up-on-scroll');
    elems.forEach(elem => {
        if (isElementUnderBottom(elem, -20)) {
        elem.style.opacity = "0";
        elem.style.transform = 'translateY(70px)';
        } else {
        elem.style.opacity = "1";
        elem.style.transform = 'translateY(0px)';
        }
    })
}

window.addEventListener('scroll', handleScroll);
