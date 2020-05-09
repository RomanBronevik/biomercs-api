import { Column, Entity } from 'typeorm';
import { CommonColumns } from '../../shared/super/common-columns';

@Entity()
export class Type extends CommonColumns {
  @Column()
  name: string;
}
