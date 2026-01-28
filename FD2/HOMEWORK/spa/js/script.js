"use strict";

window.onhashchange = switchToStateFromURLHash;

var SPAState = {};

function switchToStateFromURLHash() {
    const URLHash = window.location.hash;
    const stateStr = URLHash.substr(1);
    if (stateStr != "") {
        SPAState = {
            pagename: stateStr
        };
    } else {
        SPAState = {
            pagename: 'Main'
        };
    }

    let pageHTML = "";
    switch (SPAState.pagename) {
        case 'Main':
            pageHTML += renderMain();
            break;
        case 'Ferm':
            pageHTML += renderFerm();
            break;
        case 'Score':
            pageHTML += "<h3>Score</h3>";
            break;
        case 'Rules':
            pageHTML += "<h3>Rules</h3>";
            break;
        case 'Shop':
            pageHTML += renderShop();
            break;
    }
    document.getElementById('IPage').innerHTML = pageHTML;
    
    // Инициализация Shop страницы
    if (SPAState.pagename === 'Shop') {
        // Небольшая задержка для гарантии, что DOM обновлен
        setTimeout(() => {
            if (typeof initShopPage === 'function') {
                initShopPage();
            }
        }, 0);
    }
}

function switchToState(newState) {
    location.hash = newState.pagename;
}

function switchToMainPage() {
    switchToState({
        pagename: 'Main'
    });
}

function switchToFerm() {
    switchToState({
        pagename: 'Ferm'
    });
}

function switchToScorePage() {
    switchToState({
        pagename: 'Score'
    });
}

function switchToRulesPage() {
    switchToState({
        pagename: 'Rules'
    });
}

function switchToShopPage() {
    switchToState({
        pagename: 'Shop'
    });
}

addEventListener('DOMContentLoaded', () => {
    switchToStateFromURLHash();
});


function createHandler (element, closeFunction) {
    return function(event) {
        if(!element.contains(event.target)) {
            closeFunction()
        }
    }
}