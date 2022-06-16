const coffee_list = document.querySelector(".coffee_list");
const coffee_single_list = document.querySelector(".coffee_single_list");
const coffee_special_list = document.querySelector(".coffee_special_list");
const image_view = document.querySelector(".image_view");
const image_view_container = document.querySelector(".image_view .container");


// JSON 불러오기
/*
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
        console.log(coffee);
        paintCoffee(coffee);
});
*/

            window.onload = function () { 
                startLoadFile('coffee.json'); 
            };

            function startLoadFile(jsonUrl){ 
                $.ajax({ url: jsonUrl, 
                type: 'GET', 
                dataType : 'json', 
                success : function (data) { 
                    paintCoffee(data) 
                } 
            	}); 
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


//커피사진 팝업창
function hideImage(){
    image_view.classList.remove('show');
    while(image_view_container.hasChildNodes()){
        image_view_container.removeChild(image_view_container.firstChild);
    }
}

function paintCoffee(coffee){
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

        //제품명
        const title = appendElement("h2",data.title,"title");

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

        left_container.appendChild(img_box);
        left_container.appendChild(str_box);
        left_container.appendChild(strTag);
        left_container.appendChild(roasting_box);
        img_box.appendChild(coffee_image);
        contents_container.appendChild(number_box);
        if (data.flag != null && data.flag != ""){
            contents_container.appendChild(flag_box);
        }
        contents_container.appendChild(title);
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

