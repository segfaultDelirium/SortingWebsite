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
function quickSort(containers, sleepTime) {
    return __awaiter(this, void 0, void 0, function* () {
        const status = document.querySelector("#status");
        if (!status)
            return;
        setProgress(true);
        let N = containers.length;
        let l = 0;
        let r = N - 1;
        // console.log('in quickSort before if');
        if (l < r) {
            let i = yield splitArray(containers, l, r, sleepTime);
            yield _quicksort(containers, l, i - 1, sleepTime);
            yield _quicksort(containers, i + 1, r, sleepTime);
        }
        // console.log('in quickSort after if');
        setProgress(false);
        stopFlag = false;
        startButton.innerText = 'start!';
        startButton.classList.remove('started');
    });
}
function _quicksort(containers, l, r, sleepTime) {
    return __awaiter(this, void 0, void 0, function* () {
        if (stopFlag)
            return;
        if (l < r) {
            let i = yield splitArray(containers, l, r, sleepTime);
            yield _quicksort(containers, l, i - 1, sleepTime);
            yield _quicksort(containers, i + 1, r, sleepTime);
        }
    });
}
function splitArray(containers, l, r, sleepTime) {
    return __awaiter(this, void 0, void 0, function* () {
        let splitIndex = chooseSplitPoint(l, r);
        let splitIndexValue = parseInt(containers[splitIndex].innerText);
        let c1 = containers[splitIndex];
        let c2 = containers[r];
        c1.classList.add('active1');
        c2.classList.add('active2');
        swapInnerText(containers[splitIndex], containers[r]);
        c1.classList.remove('active1');
        c2.classList.remove('active2');
        yield sleep(sleepTime / 2.0);
        updateHeight(containers);
        yield sleep(sleepTime / 2.0);
        let currentIndex = l;
        for (let i = l; i < r; i++) {
            if (parseInt(containers[i].innerText) < splitIndexValue) {
                let c1 = containers[i];
                let c2 = containers[currentIndex];
                c1.classList.add('active1');
                c2.classList.add('active2');
                swapInnerText(containers[i], containers[currentIndex]);
                yield sleep(sleepTime / 2.0);
                updateHeight(containers);
                yield sleep(sleepTime / 2.0);
                c1.classList.remove('active1');
                c2.classList.remove('active2');
                currentIndex += 1;
            }
        }
        c1 = containers[currentIndex];
        c2 = containers[r];
        c1.classList.add('active1');
        c2.classList.add('active2');
        swapInnerText(containers[currentIndex], containers[r]);
        yield sleep(sleepTime / 2.0);
        updateHeight(containers);
        yield sleep(sleepTime / 2.0);
        c1.classList.remove('active1');
        c2.classList.remove('active2');
        return currentIndex;
    });
}
function chooseSplitPoint(l, r) {
    return Math.floor(l + (r - l) / 2);
}
