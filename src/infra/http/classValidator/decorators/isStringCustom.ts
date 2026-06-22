import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ExceptionMessages } from '../data/ExceptionMessages';

export function IsStringCustom(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsStringCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string';
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessages.IsString(validationArguments.property);
        },
      },
    });
  };
}