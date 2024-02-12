import { useEffect, useState, useCallback } from 'react';
import supabase from '../util/supabaseClient';
import { MessageWithUserArrayType, SingleMessageWithUserType, GetMessageStatus, ApiErrorType, MessageStatus } from './types';
import { useContextMessages } from '../context/messages/useMessages';
import { useContextUser } from '../context/user/useUser';

export const useGetMessages = () => {
  const { setMessages } = useContextMessages();
  const [ getMessagesError, setGetMessagesError] = useState<ApiErrorType | null>(null);

  const [getMessagesStatus, setGetMessagesStatus] = useState<GetMessageStatus>('idle');


  useEffect(() => {
    const getMessages = async () => {
      setGetMessagesStatus('loading');
      setGetMessagesError(null)
      const { data, error } = await supabase
        .from("messages")
        .select(`
          id,
          created_at,
          content,
          users (
            id,
            username,
            chat_color
          )
        `)
        .order('created_at', { ascending: false })
        .returns<MessageWithUserArrayType>();

      if (error){
        setGetMessagesStatus('error');
        setGetMessagesError({
          name: error.code,
          message: error.message,
        });
      } else {
        setGetMessagesStatus('success');
        setMessages(data || []);
      }
    };
    getMessages();
    
  }, [setMessages]);

  return { getMessagesStatus, getMessagesError };
};

export const usePostMessage = () => {
  const { user } = useContextUser();
  const [postMessageStatus, setPostMessageStatus] = useState<MessageStatus>('idle');
  const [postMessageError, setPostMessageError] = useState <ApiErrorType | null>(null);

  const postMessage = async (message: string): Promise<void> => {
    const payload = {
      content: message,
      user_id: user?.id,
    };
    setPostMessageError(null);
    setPostMessageStatus('sending');
    const { error } = await supabase
      .from('messages')
      .insert(payload);
    if (error) {
      setPostMessageStatus('error');
      setPostMessageError({
        name: error.code,
        message: error.message,
      })
    } else{
      setPostMessageStatus('success');
      setPostMessageError(null);
    }
  };
  return { postMessage, setPostMessageStatus, postMessageStatus, postMessageError };
};

export const useSubscribeToMessages = (): void => {
  const { setMessages } = useContextMessages();
  const handleNewMessage = useCallback((message: SingleMessageWithUserType) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
  }, [setMessages]);

  useEffect(() => {
    const subscription = supabase
      .channel('custom-insert-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, async (payload) => {
        const messageId = payload.new.id;
        if (messageId) {
          await fetchMessageDetails(messageId, handleNewMessage);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [handleNewMessage]);
};

const fetchMessageDetails = async (messageId: number, handleNewMessage: (message: SingleMessageWithUserType) => void): Promise<void> => {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      id,
      created_at,
      content,
      users (
        id,
        username,
        chat_color
      )
    `)
    .eq('id', messageId)
    .returns<MessageWithUserArrayType>();

  if (error) {
    console.error('Error fetching message details:', error);
    return;
  }

  if (data) {
    handleNewMessage(data[0]);
  }
};
