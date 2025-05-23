import { ChatBotMessageProps } from '@/schemas/conversation.schema';
import React, { forwardRef } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import RealTimeMode from './real-time';
import TabsMenu from '../tabs';
import { BOT_TABS_MENU } from '@/constants/menu';
import { TabsContent } from '../ui/tabs';
import { Separator } from '../ui/separator';
import Bubble from './bubble';
import { Responding } from './responding';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { IoSendSharp } from "react-icons/io5";
import { BsPaperclip } from "react-icons/bs";
import { CardDescription, CardTitle } from '../ui/card';
import Accordion from '../accordian';
import { Label } from '@radix-ui/react-label';
import { cn } from '@/lib/utils';

type Props = {
  errors: any;
  register: UseFormRegister<ChatBotMessageProps>;
  chats: { role: 'assistant' | 'user'; content: string; link?: string }[];
  onChat(): void;
  onResponding: boolean;
  domainName: string;
  theme?: string | null;
  textColor?: string | null;
  help?: boolean;
  realtimeMode?: {
    chatroom: string;
    mode: boolean;
  } | undefined;
  helpdesk: {
    id: string;
    question: string;
    answer: string;
    domainId: string | null;
  }[];
  setChat: React.Dispatch<
    React.SetStateAction<
      {
        role: 'user' | 'assistant';
        content: string;
        link?: string | undefined;
      }[]
    >
  >;
  className?: string;
};

const BotWindow = forwardRef<HTMLDivElement, Props>(
  (
    {
      errors,
      register,
      chats,
      onChat,
      onResponding,
      domainName,
      helpdesk,
      realtimeMode,
      setChat,
      textColor,
      theme,
      help,
      className,
    },
    ref
  ) => {
    return (
      <div className={cn(
        "h-[560px] w-[330px] flex flex-col bg-white rounded-xl border border-black  overflow-hidden",
        className
      )}> {/*border border-purple-200 */}
        <div className="flex justify-between px-20 pt-4">
          <div className="flex gap-5">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src="/images/pic.png"
                alt="@shadcn"
              />
              <AvatarFallback>TK</AvatarFallback>
            </Avatar>
            <div className="flex items-start flex-col">
              <h3 className="text-lg mt-2 font-bold leading-none">
                Ask TKA
              </h3>
              {/* <p className="text-sm">{domainName.split('.com')[0]}</p> */}
              {realtimeMode?.mode && (
                <RealTimeMode
                  setChats={setChat}
                  chatRoomId={realtimeMode.chatroom}
                />
              )}
            </div>
          </div>
        </div>

        <TabsMenu
          triggers={BOT_TABS_MENU}
          className="bg-transparent border-[1px] border-border m-2 ml-20"
        >
          <TabsContent value="Talk to Me">
            <Separator orientation="horizontal" />
            <div className="flex flex-col h-full ">
              <div
                style={{
                  background: theme || '',
                  color: textColor || '',
                }}
                className="px-3 flex h-[360px] flex-col py-5 gap-3 chat-window overflow-y-auto"
                ref={ref}
              >
                {chats.map((chat, key) => (
                  <Bubble
                    key={key}
                    message={chat}
                  />
                ))}
                {onResponding && <Responding />}
              </div>

              <form onSubmit={onChat} className="flex px-3 py-1 flex-col -mt-3 flex-1">
                <div className="relative w-full mb-2">
                  {/* Paperclip icon (now inside input) */}
                  <Label
                    htmlFor="upload"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer p-1 rounded-full hover:bg-gray-100"
                  >
                    <BsPaperclip className="w-5 h-5 mt-2 text-black" />
                  </Label>

                  {/* Input with adjusted padding for the icon */}
                  <Input
                    {...register("content")}
                    className="w-full pl-10 pr-12 py-2 text-sm mt-2  rounded-full"
                    type="text"
                    placeholder="Write a message"
                  />

                  {/* Hidden file input */}
                  <Input
                    {...register('image')}
                    type="file"
                    id="upload"
                    className="hidden"
                  />

                  {/* Send button (unchanged) */}
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-transparent border-none shadow-none hover:bg-transparent focus:ring-0"
                  >
                    <IoSendSharp className="text-gray-800 mt-2 w-6 h-6" />
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>

          {/* <TabsContent value="helpdesk">
            <div className="h-[485px] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4">
              <div>
                <CardTitle>Help Desk</CardTitle>
                <CardDescription>
                  Browse from a list of questions people usually ask.
                </CardDescription>
              </div>
              <Separator orientation="horizontal" />

              {helpdesk.map((desk) => (
                <Accordion
                  key={desk.id}
                  trigger={desk.question}
                  content={desk.answer}
                />
              ))}
            </div>
          </TabsContent> */}
        </TabsMenu>
      </div>
    );
  }
);

BotWindow.displayName = 'BotWindow';
export default BotWindow;
