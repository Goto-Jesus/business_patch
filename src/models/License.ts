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
} from 'sequelize-typescript';
import { ILicense } from '../types/ILicense';
import { Employee } from './Employee';

@Table({
	tableName: 'license',
	createdAt: false,
	updatedAt: false,
})
export class License extends Model implements ILicense {
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
  	type: DataTypes.STRING,
  })
  	issuerName: string;

  @ForeignKey(() => Employee)
  @AllowNull(false)
  @Column({
  	field: 'employee_id',
  	type: DataTypes.STRING,
  })
  	employeeId: string;

  @BelongsTo(() => Employee)
  	employee: Employee;
}
