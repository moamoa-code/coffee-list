const body = document.getElementsByTagName("body")[0];
const lottoCon = document.querySelector(".lotto");

  let group1 = [1,2,3,4,5];
  let group2 = [6,7,8,9,10];
  let group3 = [11,12,13,14,15];
  let group4 = [16,17,18,19,20];
  let group5 = [21,22,23,24,25];
  let group6 = [26,27,28,29,30];
  let group7 = [31,32,33,34,35];
  let group8 = [36,37,38,39,40];
  let group9 = [41,42,43,44];


  originNumbers = [];
  const getOriginNumbers = () => {
      for (i = 1; i < 46; i ++){
      originNumbers.push(i);
    }
  }

  let output = []
  const getNumber = () => {
    let random = Math.floor(Math.random() * (1000 - 1)) + 1;
    console.log(random);
    if (1 <= random && random <= 46) {
      return group9;
    } else if (47<= random && random  <= 98) {
      return group8;
    } else if (99<= random && random  <= 156) {
      return group7;
    } else if (157<= random && random  <= 223) {
      return group6;
    } else if (224<= random && random  <= 302) {
      return group5;
    } else if (303<= random && random  <= 394) {
      return group4;
    } else if (395<= random && random  <= 519) {
      return group3;
    } else if (520<= random && random  <= 695) {
      return group2;
    } else {
      return group1;
    }
  }

  getOneNumber = (numbers) => {
    let random = Math.floor(Math.random() * (numbers.length - 0)) + 0;
    return numbers[random];
  }
  const lotto = () => {
    let myLottoNumbers = [];
    getOriginNumbers();
    while (true) {
      if (myLottoNumbers.length >= 6){
        const numbersCon = document.createElement("div");
        for (let i = 0; i < myLottoNumbers.length; i ++){
          const numberSpan = document.createElement("span");
          numberSpan.appendChild(document.createTextNode(myLottoNumbers[i]))
          numbersCon.appendChild(numberSpan);
        }
        lottoCon.appendChild(numbersCon);
        return;
      }
      let numbers = getNumber();
      let number = getOneNumber(numbers);
      if (myLottoNumbers.indexOf(number) === -1){
        myLottoNumbers.push(number);
      }
      console.log(number)
    }
  }