'use strict'

var gCanvas;
var gCtx;
var gCanvasStorage;
var gCtxcStorage;

function onInit() {
    renderImgs();
    gCanvas = document.querySelector('#img-canvas');
    gCtx = gCanvas.getContext('2d')
    gCanvasStorage = document.querySelector('#img-canvas-storage');
    gCtxcStorage = gCanvasStorage.getContext('2d')
}

function renderImgs(imgs = getImgs()) {
    const elContainer = document.querySelector('.imags-container');
    let strHtml = ``;
    imgs.map(img => strHtml += `<img class="img" id="${img.id}" onclick="onImageClick(this)" 
    src="${img.url}" alt="">`);
    elContainer.innerHTML = strHtml;
}

function onfilterImgs(ev) {
    ev.preventDefault();
    const searchInput = document.querySelector('.input-search').value;
    if (!searchInput) return renderImgs();
    const imgs = filterImgs(searchInput);
    renderImgs(imgs);
}

function onImageClick(img) {
    const elModal = document.querySelector('.modal');
    drawImg(img.src);
    setCurrImgId(img.id);
    elModal.style.display = "block";
}

function onCloseModal() {
    const elModal = document.querySelector('.modal');
    elModal.style.display = "none";
}

function drawImg(src, isFromStorage = false) {
    var img = new Image();
    let canvas = gCanvasStorage;
    if (!isFromStorage) {
        canvas = gCanvas;
        src = src.substring(22);
    }
    img.src = src;
    canvas.style = `background-image: url("${src}");background-size: cover;`
}

function onEnterText(textInput) {
    SetMemeText(textInput);
    drawText();
}

function drawText(isFromStorage = false) {
    clearCanvas();
    var meme = getImgMemes();
    var ctx = gCtx;
    if (isFromStorage) {
        meme = loadFromStorage('meme');
        ctx = gCtxcStorage;
    };
    meme.lines.forEach(line => {
        ctx.lineWidth = line.lineWidth;
        ctx.strokeStyle = line.strokeColor;
        ctx.fillStyle = line.fillColor;
        ctx.font = `${line.size}px ${line.font}`;
        ctx.textAlign = line.align;
        ctx.fillText(line.txt, line.offSet.x, line.offSet.y);
        ctx.strokeText(line.txt, line.offSet.x, line.offSet.y);
    })
}

function onAddLine() {
    addLine();
    drawText();
}

function onDeleteLine() {
    deleteLine();
    drawText();
}

function onMoveDownOrUp(value) {
    const offSet = getLineOffSet();
    let param = 10;
    if (value === 'up') param = -10;
    setLineOffSet(offSet.x, offSet.y + param);
    drawText();
}

function onSwitchLine() {
    switchSelectedLineIdx();
}

function onChangeFontSize(value) {
    let param = 10;
    if (value === 'decrease') param = -10;
    setFontSize(param);
    drawText();
}

function onChangeAlignment(alignSide) {
    setAlignmemt(alignSide);
    drawText();
}

function onChangeColor(colorParam, color) {
    setColor(colorParam, color);
    drawText();
}

function onDownload(elLink) {
    downloadImg(elLink);
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function onSaveToStorage() {
    const img = getCurrImg();
    saveToStorage(img, `img`);
    const meme = getImgMemes()
    saveToStorage(meme, `meme`);
}

function onCloseModalStorage() {
    const elModal = document.querySelector('.storage');
    elModal.style.display = "none";
}

function onOpenModalStorage() {
    const img = loadFromStorage('img');
    drawImg(img.url, true);
    drawText(true);
    const elModal = document.querySelector('.storage');
    elModal.style.display = "block";
}