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
        let N = containers.length;
        if (l < r) {
            let i = yield splitArray(containers, l, r, sleepTime);
            yield _quicksort(containers, l, i - 1, sleepTime);
            yield _quicksort(containers, i + 1, r, sleepTime);
        }
    });
}
function splitArray(containers, l, r, sleepTime) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log('in splitArray');
        let splitIndex = chooseSplitPoint(l, r);
        // console.log(splitIndex)
        // console.log(containers.length);
        let splitIndexValue = parseInt(containers[splitIndex].innerText);
        // console.log('before swap')
        // console.log(containers[splitIndex])
        // console.log(containers.length)
        // console.log(r);
        // console.log(containers[r])
        swapInnerText(containers[splitIndex], containers[r]);
        // console.log('after swap')
        yield sleep(sleepTime / 2.0);
        updateHeight(containers);
        yield sleep(sleepTime / 2.0);
        let currentIndex = l;
        for (let i = l; i < r; i++) {
            if (parseInt(containers[i].innerText) < splitIndexValue) {
                swapInnerText(containers[i], containers[currentIndex]);
                yield sleep(sleepTime / 2.0);
                updateHeight(containers);
                yield sleep(sleepTime / 2.0);
                currentIndex += 1;
            }
        }
        swapInnerText(containers[currentIndex], containers[r]);
        yield sleep(sleepTime / 2.0);
        updateHeight(containers);
        yield sleep(sleepTime / 2.0);
        return currentIndex;
    });
}
function chooseSplitPoint(l, r) {
    return Math.floor(l + (r - l) / 2);
}
