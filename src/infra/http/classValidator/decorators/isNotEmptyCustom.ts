import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { ExceptionMessages } from '../data/ExceptionMessages';

export function IsNotEmptyCustom(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsNotEmptyCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            value !== undefined && value !== null && String(value).trim() !== ''
          );
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessages.IsNotEmpty(validationArguments.property);
        },
      },
    });
  };
}