'use strict'

let gIdImg = 0;
let gKeywords = { 'happy': 0, 'funny': 0, 'animal': 0, 'happy': 0, 'sad': 0 };
let gMemes = [];
let gCurrImgId = 0;
let gImgs = initgImgs();

function getImgs() {
    return gImgs;
}

function initgImgs() {
    const imgNum = 18;
    let imgs = [];
    for (let i = 1; i <= imgNum; i++) {
        imgs.push(initImg());
        gMemes.push(initImgMemeLine(i));
    }
    initImgKeywords(imgs);
    return imgs;
}

function initImg() {
    return { id: ++gIdImg, url: `imgs/${gIdImg}.jpg`, keywords: [] };
}

function initImgMemeLine(id) {
    return {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [setLine()]
    }
}

function setLine() {
    return {
        txt: 'Enter Text',
        size: '20',
        align: 'center',
        fillColor: 'pink',
        strokeColor: 'blue',
        lineWidth: 1,
        offSet: { x: 150, y: 30 },
        font: 'Impact',
    }
}

function initImgKeywords(imgs) {
    let imgIdWithAnimal = [2, 3, 4]
    let imgIdWithFunny = [3, 6, 7, 8, 9, 10]
    let imgIdWithHappy = [6, 8, 10]
    let imgIdWithSad = [16]
    imgs.map(img => {
        if (imgIdWithAnimal.includes(img.id)) {
            img.keywords.push('animal');
        }
        if (imgIdWithFunny.includes(img.id)) {
            img.keywords.push('funny');
        }
        if (imgIdWithHappy.includes(img.id)) {
            img.keywords.push('happy');
        }
        if (imgIdWithSad.includes(img.id)) {
            img.keywords.push('sad');
        }
    });
}

function filterImgs(filterBy) {
    return gImgs.filter(function(img) {
        return img.keywords.includes(filterBy);
    })
}

function setCurrImgId(id) {
    gCurrImgId = id;
}

function SetMemeText(txt) {
    const lineIdx = gMemes[gCurrImgId].selectedLineIdx;
    if (!gMemes[gCurrImgId].lines.length) gMemes[gCurrImgId].lines.push(setLine());
    gMemes[gCurrImgId].lines[lineIdx].txt = txt;
}

function getLineWidth() {
    const lineIdx = gMemes[gCurrImgId].selectedLineIdx;
    return gMemes[gCurrImgId].lines[lineIdx].lineWidth;
}

function getStrokeColor() {
    const lineIdx = gMemes[gCurrImgId].selectedLineIdx;
    return gMemes[gCurrImgId].lines[lineIdx].strokeColor;
}

function setColor(colorParam, color) {
    const lineIdx = gMemes[gCurrImgId].selectedLineIdx;
    gMemes[gCurrImgId].lines[lineIdx][colorParam] = color;
}

function setFontSize(param) {
    const lineIdx = gMemes[gCurrImgId].selectedLineIdx;
    let currSize = parseInt(gMemes[gCurrImgId].lines[lineIdx].size);
    if (20 > currSize && param < 0) return;
    gMemes[gCurrImgId].lines[lineIdx].size = param + currSize;
}

function setAlignmemt(alignSide) {
    const lineIdx = gMemes[gCurrImgId].selectedLineIdx;
    gMemes[gCurrImgId].lines[lineIdx].align = alignSide;
}

function addLine() {
    gMemes[gCurrImgId].lines.push(setLine());
    var lineIdx = gMemes[gCurrImgId].selectedLineIdx;
    if (1 < gMemes[gCurrImgId].lines.length) {
        lineIdx = gMemes[gCurrImgId].selectedLineIdx++;
    }
    let offSet = getLineOffSet(lineIdx);
    setLineOffSet(offSet.x, offSet.y + 50)
}

function deleteLine() {
    const lineIdx = gMemes[gCurrImgId].selectedLineIdx
    gMemes[gCurrImgId].lines.splice(lineIdx, 1);
    if (gMemes[gCurrImgId].selectedLineIdx) gMemes[gCurrImgId].selectedLineIdx--;
}

function getLineOffSet(lineIdx = gMemes[gCurrImgId].selectedLineIdx) {
    return gMemes[gCurrImgId].lines[lineIdx].offSet;
}

function setLineOffSet(x, y) {
    const lineIdx = gMemes[gCurrImgId].selectedLineIdx;
    gMemes[gCurrImgId].lines[lineIdx].offSet.x = x;
    gMemes[gCurrImgId].lines[lineIdx].offSet.y = y;
}

function getLineTxt() {
    const lineIdx = gMemes[gCurrImgId].selectedLineIdx;
    return gMemes[gCurrImgId].lines[lineIdx].txt;
}

function getImgMemes() {
    return gMemes[gCurrImgId];
}

function getCurrImg() {
    return gImgs[gCurrImgId - 1];
}

function switchSelectedLineIdx() {
    gMemes[gCurrImgId].selectedLineIdx = (gMemes[gCurrImgId].selectedLineIdx + 1) % gMemes[gCurrImgId].lines.length;
}