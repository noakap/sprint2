'use strict';

var STORAGE_KEY = 'todosDB';

function loadFromStorage(key) {
    var str = localStorage.getItem(key)
    var val = JSON.parse(str);
    return val;
}

function saveToStorage(val, key) {
    var str = JSON.stringify(val)
    localStorage.setItem(key, str)
}