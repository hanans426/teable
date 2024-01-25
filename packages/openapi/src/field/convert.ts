import type { RouteConfig } from '@asteasolutions/zod-to-openapi';
import type { IFieldVo, IConvertFieldRo } from '@teable-group/core';
import { fieldVoSchema, convertFieldRoSchema } from '@teable-group/core';
import { axios } from '../axios';
import { registerRoute, urlBuilder } from '../utils';
import { z } from '../zod';

export const CONVERT_FIELD = '/table/{tableId}/field/{fieldId}/convert';

export const ConvertFieldRoute: RouteConfig = registerRoute({
  method: 'put',
  path: CONVERT_FIELD,
  description:
    'Convert a field, this field of all records will automatically be type casted, you mate',
  request: {
    params: z.object({
      tableId: z.string(),
      fieldId: z.string(),
    }),
    body: {
      content: {
        'application/json': {
          schema: convertFieldRoSchema.openapi({
            description:
              'You should always pass in all the properties of the entire field, whether you have modified it or not。You can simply retrieve it, modify it, and pass it in',
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Returns field data after update.',
      content: {
        'application/json': {
          schema: fieldVoSchema,
        },
      },
    },
  },
  tags: ['field'],
});

export const convertField = async (tableId: string, fieldId: string, fieldRo: IConvertFieldRo) => {
  return axios.put<IFieldVo>(
    urlBuilder(CONVERT_FIELD, {
      tableId,
      fieldId,
    }),
    fieldRo
  );
};
