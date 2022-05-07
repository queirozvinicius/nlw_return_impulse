import { ChatTeardropDots } from "phosphor-react"
import { Popover } from '@headlessui/react'
import { WidgetForm } from "./WidgetForm"
//estado: uma variável de estado do React, onde o React fica observando. Toda vez que 
//que a variável muda, o React cria uma nova interface com os novos valores dessa variável.

export function Widget(){    
    return (
        <Popover className="absolute bottom-4 right-4 md:bottom-8 md:right-8  flex flex-col items-end">
            <Popover.Panel>
                <WidgetForm/>
            </Popover.Panel>

            <Popover.Button className="bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group">
            <ChatTeardropDots className="w-6 h-6"/>

            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
                <span className="pl-2">Feedback</span>
            </span>
            </Popover.Button>
        </Popover>
    )
}