import { OpaqueToken } from '@angular/core';

export const config = {
  apiUrl: 'http://127.0.0.1:3000/api/v1'
};

export const apiUrl = new OpaqueToken('apiUrl');
