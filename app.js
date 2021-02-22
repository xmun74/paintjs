const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
  painting = false;
}

const startPainting = (event) => {  //그리기시작
  if(filling === false) {   //filling이 f일때(Fill아닐때)만 그리기
    painting = true;
  }
}

function onMouseMove(event) {  //마우스움직이는 내내 발생
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {    //경로를 만들기
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {            //클릭해그리기
    ctx.lineTo(x, y);   //이전선과 현재선이 이어짐
    ctx.stroke();       //선을 긋는 것
  }
}


function handleColorClick(event) {
  const color = event.target.style.backgroundColor;   //color = target으로 색 부르고
  ctx.strokeStyle = color;    //선색을 color으로 적용
  ctx.fillStyle = color;
}

function handleRangeChange(event) {   //인풋 range
  const size = event.target.value;
  ctx.lineWidth = size;  //라인넓이가 target.value값으로 자동 지정
}

function handleModeClick() {   //Fill btn
  if(filling === true) {
    filling = false;
    mode.innerText = "Fill"
  } else {
    filling = true;
    mode.innerText = "Paint"
  }
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);  //마우스클릭할때 선페인팅시작
  canvas.addEventListener("mouseup", stopPainting);     //마우스
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(colorrr =>        //Array from으로 obj를 arr로 만들고 
  colorrr.addEventListener("click", handleColorClick)   //foreach로 돌려서 클릭이벤트호출
);

if(range) {
  range.addEventListener("input", handleRangeChange);  //range가 input할때
}

if(mode) {
  mode.addEventListener("click", handleModeClick)   //Fill btn이 클릭될때
}

if(saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}