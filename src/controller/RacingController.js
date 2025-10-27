import { MissionUtils } from "@woowacourse/mission-utils";
import { InputView } from "../views/index.js";
import { OutputView } from '../views/index.js';
import { validateCarNameArray, validateTryCount } from '../utils/index.js';
import { Race } from "../models/index.js";

export class RacingController {
    async run() {
        try {
            const carNames = await InputView.readNames();
            validateCarNameArray(carNames);
            const tryCount = await InputView.readTryCount();
            validateTryCount(tryCount);

            const race = new Race(carNames, tryCount);

            OutputView.printStart();


        } catch(error) {
            OutputView.printError(error.message);
            throw error;
        }
    }

    startRace() {
        for (let i = 0; i < this.tryCount; i++) {
            this.moveCars();
        }
    }
}