import { MissionUtils } from "@woowacourse/mission-utils";
import { InputView } from "../views/index.js";
import { OutputView } from '../views/index.js';


export class RacingController {
    async run() {
        try {
            const carNames = await InputView.readNames();
        } catch(error) {
            OutputView.printError(error.message);
            throw error;
        }
    }
}