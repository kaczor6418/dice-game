import { DiceGameGuess } from '@/common/Enums';

export interface NewDiceHistoryItem {
  readonly dice: number;
  readonly scoreDelta: number;
  readonly guess: DiceGameGuess;
}
