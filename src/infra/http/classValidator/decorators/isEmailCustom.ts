import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { ExceptionMessages } from '../data/ExceptionMessages';

export function IsEmailCustom(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsEmailCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return typeof value === 'string' && emailRegex.test(value);
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessages.IsEmail(validationArguments.property);
        },
      },
    });
  };
}