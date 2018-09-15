import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsJSON } from 'class-validator'
import {defaultBoard} from './logic'

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number
  readonly: true
  unique: true


  @IsString()
    @Column('text')
    name: string
    
  @IsString()
    @Column('text')
    color: string

  @IsJSON()
    @Column('json',
    {default: defaultBoard})
    // I don't think this is the way to go, but now it accepts the defaultBoard:
    board: string[][]

}