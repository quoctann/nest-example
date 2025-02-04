import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

// This decorator help guard determine route is need protect by authority or
// not, similar name: AllowAnon, SkipAuth,...
//
// We can create custom decorator by SetMetaData or Reflector.createDecorator,
// this will attach custom metadata into route handler with this decorator
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
