/* eslint-disable no-mixed-spaces-and-tabs */
import { DataTypes } from 'sequelize';
import {
	Model,
	Table,
	Column,
	AllowNull,
	PrimaryKey,
	HasMany,
} from 'sequelize-typescript';
import { Employee } from './Employee';
import { IBusiness } from '../types/IBusiness';

@Table({
	tableName: 'business',
	createdAt: false,
	updatedAt: false,
})
export class Business extends Model implements IBusiness {
	@PrimaryKey
	@AllowNull(false)
	@Column({
		type: DataTypes.STRING,
	})
		id: string;

  @AllowNull(false)
	@Column({
		type: DataTypes.STRING,
	})
  	name: string;

  @HasMany(() => Employee)
  	employees: Employee[];
}
