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
        case 'Game':
            pageHTML += renderGame();
            break;
        case 'Score':
            pageHTML += "<h3>Score</h3>";
            break;
        case 'Rules':
            pageHTML += "<h3>Rules</h3>";
            break;
    }
    document.getElementById('IPage').innerHTML = pageHTML;
}

function switchToState(newState) {
    location.hash = newState.pagename;
}

function switchToMainPage() {
    switchToState({
        pagename: 'Main'
    });
}

function switchToGamePage() {
    switchToState({
        pagename: 'Game'
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

switchToStateFromURLHash();