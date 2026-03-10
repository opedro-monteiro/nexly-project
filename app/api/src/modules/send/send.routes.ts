import { z } from 'zod'
import { commonResponseSchema } from '../../schemas/common.response.schema'
import { idParamSchema } from '../../schemas/common.schema'
import type { FastifyTypedInstance } from '../../types'
import {
  createSendController,
  deleteSendController,
  getSendByIdController,
  listSendsController,
  updateSendController,
} from './send.controller'
import { createSendSchema, sendSchema, updateSendSchema } from './send.schema'

export async function sendRoutes(app: FastifyTypedInstance) {
  app.post(
    '/sends',
    {
      schema: {
        body: createSendSchema,
        tags: ['sends'],
        response: {
          201: sendSchema,
          ...commonResponseSchema,
        },
      },
    },
    createSendController
  )

  app.get(
    '/sends',
    {
      schema: {
        tags: ['sends'],
        response: {
          200: z.array(sendSchema),
          ...commonResponseSchema,
        },
      },
    },
    listSendsController
  )

  app.get(
    '/sends/:id',
    {
      schema: {
        params: idParamSchema,
        tags: ['sends'],
        response: {
          200: sendSchema,
          ...commonResponseSchema,
        },
      },
    },
    getSendByIdController
  )

  app.put(
    '/sends/:id',
    {
      schema: {
        params: idParamSchema,
        body: updateSendSchema,
        tags: ['sends'],
        response: {
          200: sendSchema,
          ...commonResponseSchema,
        },
      },
    },
    updateSendController
  )

  app.delete(
    '/sends/:id',
    {
      schema: {
        params: idParamSchema,
        tags: ['sends'],
        response: {
          200: z.object({ message: z.string() }),
          ...commonResponseSchema,
        },
      },
    },
    deleteSendController
  )
}
