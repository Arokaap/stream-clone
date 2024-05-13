'use client'

import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react'
import { ConnectionState } from 'livekit-client'
import * as React from 'react'
import { useState, useMemo, useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { ChatHeader, ChatHeaderSkeleton } from './chat-header'
import { ChatForm, ChatFormSkeleton } from './chat-form'
import { ChatList, ChatListSkeleton } from './chat-list'
import ChatCommunity from './chat-community'

interface ChatProps {
  hostName: string
  hostIdentity: string
  viewerName: string
  isFollowing: boolean
  isChatEnabled: boolean
  isChatDelayed: boolean
  isChatFollowersOnly: boolean
}

export const Chat = ({
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly

}: ChatProps): JSX.Element => {
  const matches = useMediaQuery('(max-width: 1024px)')
  const { variant, onExpand } = useChatSidebar((state) => state)
  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity)

  const isOnline = participant && connectionState === ConnectionState.Connected

  const isHidden = !isChatEnabled || !isOnline

  const [value, setValue] = useState('')
  const { chatMessages: messages, send } = useChat()

  useEffect(() => {
    if (matches) {
      onExpand()
    }
  }, [matches, onExpand])

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp)
  }, [messages])

  const onSubmit = async (): Promise<void> => {
    if (!send) return

    await send(value)
    setValue('')
  }

  const onChange = (value: string): void => {
    setValue(value)
  }

  return (
    <div className='flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]'>
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
        <ChatList
          messages={reversedMessages}
          isHidden={isHidden}
        />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity
          viewerName={viewerName}
          hostName={hostName}
          isHidden={isHidden}
        />
      )}
    </div>
  )
}

export const ChatSkeleton = (): JSX.Element => {
  return (
    <div className='flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2'>
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  )
}
