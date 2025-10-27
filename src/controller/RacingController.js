import { MissionUtils } from "@woowacourse/mission-utils";
import { InputView } from "../views/index.js";
import { OutputView } from '../views/index.js';
import { validateCarNameArray, validateTryCount } from '../utils/index.js';


export class RacingController {
    async run() {
        try {
            const carNames = await InputView.readNames();
            validateCarNameArray(carNames);
            const tryCount = await InputView.readTryCount();
            validateTryCount(tryCount);
        } catch(error) {
            OutputView.printError(error.message);
            throw error;
        }
    }
}