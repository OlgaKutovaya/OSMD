import { OpaqueToken } from '@angular/core';
import { environment } from '../../environments/environment';

export const config = {
  apiUrl: environment.host + '/api/v1'
};

export const apiUrl = new OpaqueToken('apiUrl');
