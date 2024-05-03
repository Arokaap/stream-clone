import { headers } from 'next/headers'
import { WebhookReceiver } from 'livekit-server-sdk'

import { db } from '@/lib/db'

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY ?? '',
  process.env.LIVEKIT_API_SECRET ?? ''
)

export async function POST (req: Request): Promise<Response | undefined> {
  try {
    const body = await req.text()
    const headerPayload = headers()
    const authorization = headerPayload.get('Authorization')

    if (!authorization) {
      return new Response('No authorization header', { status: 400 })
    }

    const event = receiver.receive(body, authorization)

    if ((await event).event === 'ingress_started') {
      await db.stream.update({
        where: {
          ingressId: (await event).ingressInfo?.ingressId
        },
        data: {
          isLive: true
        }
      })
    }

    if ((await event).event === 'ingress_ended') {
      await db.stream.update({
        where: {
          ingressId: (await event).ingressInfo?.ingressId
        },
        data: {
          isLive: false
        }
      })
    }

    return new Response('Event processed successfully', { status: 200 })
  } catch {
    return new Response('Error processing JWT or updating database', { status: 500 })
  }
}
