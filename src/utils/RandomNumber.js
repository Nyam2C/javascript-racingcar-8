import { Random } from '@woowacourse/mission-utils';
import { GAME_RULES } from "../constants/index.js";

const RandomNumber = {
    pick: () =>
    Random.pickNumberInRange(
      GAME_RULES.RANDOM_NUMBER_MIN,
      GAME_RULES.RANDOM_NUMBER_MAX
    ),
};

export default RandomNumber;