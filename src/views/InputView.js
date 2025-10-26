import { MissionUtils } from '@woowacourse/mission-utils';
import { PROMPT } from "../constants/index.js";

const InputView = {
    async readNames() {
        const input  = await MissionUtils.Console.readLineAsync(PROMPT.CAR_NAME);
        return input;
    },
}

export default InputView;