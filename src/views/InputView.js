import { MissionUtils } from '@woowacourse/mission-utils';
import { PROMPT } from "../constants/index.js";

const InputView = {
    async readNames() {
        const input  = await MissionUtils.Console.readLineAsync(PROMPT.CAR_NAME);
        return input.split(",").map((name) => name.trim());
    },

    async readTryCount() {
        const input  = await MissionUtils.Console.readLineAsync(PROMPT.TRY_COUNT);
        return input.trim();
    },
}

export default InputView;