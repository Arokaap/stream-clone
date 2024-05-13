'use client'

import { useParticipants } from '@livekit/components-react'
import * as React from 'react'
import { useState, useMemo } from 'react'
import { useDebounce } from 'usehooks-ts'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import CommunityItem from './community-item'
import { type LocalParticipant, type RemoteParticipant } from 'livekit-client'

interface ChatCommunityProps {
  hostName: string
  viewerName: string
  isHidden: boolean
}

const ChatCommunity = ({ hostName, viewerName, isHidden }: ChatCommunityProps): JSX.Element => {
  const [value, setValue] = useState('')

  const debouncedValue = useDebounce<string>(value, 500)
  const participants = useParticipants()

  const onChange = (newValue: string): void => {
    setValue(newValue)
  }

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce<Array<RemoteParticipant | LocalParticipant>>((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant)
      }

      return acc
    }, [])
    return deduped.filter((participant) => {
      return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase())
    })
  }, [participants, debouncedValue])

  if (isHidden) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <p className='text-sm text-muted-foreground'>
          Community is disabled
        </p>
      </div>
    )
  }

  return (
    <div className='p-4'>
      <Input
        onChange={(e) => { onChange(e.target.value) }}
        placeholder='Search community'
        className='border-white/10'
      />
      <ScrollArea className='gap-y-2 mt-4'>
        <p className='text-center text-sm text-muted-foreground hidden last:block p-2'>
          No results
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  )
}

export default ChatCommunity
