"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const startButton = document.querySelector("#start-btn");
let stopFlag = false;
startButton.addEventListener('click', () => {
    if (!startButton.classList.contains('started')) {
        startButton.innerText = "stop!";
        startButton.classList.add('started');
        let sleeptime = parseInt(sleepTimeText.innerHTML);
        setTransitionTime(containers, sleeptime / 2.0);
        bobbleSort(containers, sleeptime);
        updateHeight(containers);
    }
    else {
        stopFlag = true;
    }
});
function bobbleSort(containers, sleepTime) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('in bobbleSort start');
        const status = document.querySelector("#status");
        if (!status)
            return;
        status.innerText = "in progress";
        status.style.color = 'red';
        status.style.background = 'silver';
        console.log('sleeptime = ' + sleepTime / 2.0);
        let N = containers.length;
        for (let i = 0; i < N - 1; i++) {
            for (let j = 0; j < N - i - 1; j++) {
                if (stopFlag)
                    break;
                if (parseInt(containers[j].innerText) > parseInt(containers[j + 1].innerText)) {
                    containers[j].classList.add('active1');
                    containers[j + 1].classList.add('active2');
                    swapInnerText(containers[j], containers[j + 1]);
                    yield sleep(sleepTime / 2.0);
                    updateHeight(containers);
                    yield sleep(sleepTime / 2.0);
                    containers[j].classList.remove('active1');
                    containers[j + 1].classList.remove('active2');
                }
            }
            if (stopFlag)
                break;
        }
        stopFlag = false;
        status.innerText = "Done!";
        status.style.color = 'yellowgreen';
        status.style.background = 'black';
        startButton.innerText = 'start!';
        startButton.classList.remove('started');
        console.log('in bobble sort end');
    });
}
