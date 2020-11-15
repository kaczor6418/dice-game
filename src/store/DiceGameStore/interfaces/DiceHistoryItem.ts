import { DiceGameGuess } from '@/common/Enums';

export interface DiceHistoryItem {
  readonly dice: number;
  readonly round: number;
  readonly score: number;
  readonly guess: DiceGameGuess;
}
