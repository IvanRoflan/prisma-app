import { TransformFnParams } from 'class-transformer';

export const trimString = ({ value }: TransformFnParams) => value?.trim();
