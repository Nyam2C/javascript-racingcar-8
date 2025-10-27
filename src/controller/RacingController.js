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
            this.startRace(race, tryCount);
            
            OutputView.printWinners(race);
        } catch(error) {
            OutputView.printError(error.message);
            throw error;
        }
    }

    startRace(race, tryCount) {
        for (let i = 0; i < tryCount; i++) {
            race.moveCars();
            OutputView.printRoundResult(race);
        }
    }
}