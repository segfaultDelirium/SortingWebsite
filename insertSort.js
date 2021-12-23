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
function insertSort(containers, sleepTime) {
    return __awaiter(this, void 0, void 0, function* () {
        const status = document.querySelector("#status");
        if (!status)
            return;
        setProgress(true);
        let N = containers.length;
        let i = 1;
        while (i < N) {
            let j = i;
            while (j > 0 && !isContainer1Smaller(containers[j - 1], containers[j])) {
                if (stopFlag)
                    break;
                let c1 = containers[j - 1];
                let c2 = containers[j];
                c1.classList.add('active1');
                c2.classList.add('active2');
                swapInnerText(containers[j], containers[j - 1]);
                yield sleep(sleepTime / 2.0);
                updateHeight(containers);
                yield sleep(sleepTime / 2.0);
                j -= 1;
                c1.classList.remove('active1');
                c2.classList.remove('active2');
            }
            i += 1;
            if (stopFlag)
                break;
        }
        setProgress(false);
        stopFlag = false;
        startButton.innerText = 'start!';
        startButton.classList.remove('started');
    });
}
