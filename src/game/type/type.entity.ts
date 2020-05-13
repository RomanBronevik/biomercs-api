import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { CommonColumns } from '../../shared/super/common-columns';
import { GameModeType } from '../game-mode-type/game-mode-type.entity';

@Entity()
export class Type extends CommonColumns {
  @Column()
  name: string;

  @Column()
  playerQuantity: number;

  @OneToMany(
    () => GameModeType,
    gameModeType => gameModeType.type
  )
  @JoinColumn()
  gameModeTypes: GameModeType[];
}
