/* eslint-disable no-mixed-spaces-and-tabs */
import { DataTypes } from 'sequelize';
import {
	Model,
	Table,
	Column,
	AllowNull,
	PrimaryKey,
	BelongsTo,
	ForeignKey,
	HasMany,
} from 'sequelize-typescript';
import { EmployeeTitle } from '../types/EmployeeTitle.enum';
import { Business } from './Business';
import { License } from './License';
import { IEmployee } from '../types/IEmployee';

@Table({
	tableName: 'employee',
	createdAt: false,
	updatedAt: false,
})
export class Employee extends Model implements IEmployee {
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

  @AllowNull(false)
  @Column({
  	type: DataTypes.ENUM(...Object.values(EmployeeTitle)),
  })
  	title: EmployeeTitle;

  @ForeignKey(() => Business)
  @AllowNull(false)
  @Column({
  	field: 'business_id',
  	type: DataTypes.STRING,
  })
  	businessId: string;

  @HasMany(() => License)
  	licenses?: License[];

  @BelongsTo(() => Business)
  	business: Business;
}
