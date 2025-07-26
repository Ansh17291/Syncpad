'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, HighlighterIcon, ImageIcon, Italic, Link2Icon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageSquareIcon, MinusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheckIcon, Underline, Undo2Icon, UploadIcon,PlusIcon, ListCollapseIcon } from "lucide-react";
import { type Level } from "@tiptap/extension-heading"
import { type ColorResult, CirclePicker, SketchPicker } from "react-color";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";


const LineHeightButton = () => {
    const {editor} = useEditorStore();
    const lineHeights = [
        { label : "Default", value : "normal"},
        { label : "Single", value : "1"},
        {label: "1.15", value : "1.15"},
        {label : "1.5", value : "1.5"},
        {label : "Double", value : "2"}
    ]


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-400/80">
                    <ListCollapseIcon className="size-4"/>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {lineHeights.map(({label,value})=>(
                    <button
                        key={value}
                        onClick={()=>editor?.chain().focus().setLineHeight(value).run()}
                        className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-400/80",
                            editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-400/80"
                        )}
                    >
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )

}





const FontSizeButton  = () => {
    const {editor} = useEditorStore();

    const currentFontSize = editor?.getAttributes("textStyle").fontSize ? editor?.getAttributes("textStyle").fontSize.replace("px", "") : "16";


    const [fontSize , setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(fontSize);
    const [isEditing , setIsEditing] = useState(false);


    const updateFontSize = (newSize: string)=>{
        const size = parseInt(newSize);

        if(!isNaN(size) && size>0){
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFontSize(newSize);
            setInputValue(newSize);
            setIsEditing(false);
        }
    }

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        setInputValue(e.target.value);
    }

    const handleInputBlur= () =>{
        updateFontSize(inputValue);
    }

    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === "Enter"){
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands.focus();
        }
    };

    const increment = () =>{
        const newSize = parseInt(fontSize) + 1;
        updateFontSize(newSize.toString());
    }
    const decrement = () =>{
        const newSize = parseInt(fontSize) - 1;
        if(newSize > 0){
            updateFontSize(newSize.toString());
        }
    }

    return (
        <div className ="flex items-center gap-x-0.5">
            <button 
            onClick={decrement}
            className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-400/80">
                <MinusIcon className="size-4"/>
            </button>

            {
                isEditing ?(
                    <input
                    type="text"
                    inputMode="numeric"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className="h-7 w-9 text-sm text-center border border-neutral-600 rounded-sm bg-transparent focus:outline-none focus:ring-0"
                    >
                    </input>
                ):(
                    <button
                    onClick={()=>{
                        setIsEditing(true)
                        setFontSize(currentFontSize)
                    }}
                    className="h-7 w-10 text-center border-neutral-600 text-sm rounded-sm bg-transparent cursor:text"
                    >
                        {currentFontSize}
                    </button>
                )

            }

            <button 
            onClick={increment}
            className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-400/80">
                <PlusIcon className="size-4"/>
            </button>
        </div>
    )

}



const ListButton = () => {
    const {editor} = useEditorStore();
    const lists = [
        {
            label:"Bullet List",
            icon : ListIcon,
            isActive :()=>editor?.isActive("bulletList"),
            onClick : ()=> editor?.chain().focus().toggleBulletList().run()
        },
        {
            label:"Ordered List",
            icon : ListOrderedIcon,
            isActive :()=>editor?.isActive("orderedList"),
            onClick : ()=> editor?.chain().focus().toggleOrderedList().run()
        },
    ]


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-400/80">
                    <ListIcon className="size-4"/>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {lists.map(({label, icon :Icon,onClick, isActive})=>(
                    <button
                        key={label}
                        onClick={onClick}
                        className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-400/80",
                            isActive() && "bg-neutral-400/80"
                        )}
                    >
                        <Icon className="size-4"/>
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )

}



const AlignButton = () => {
    const {editor} = useEditorStore();
    const alignments = [
        {
            label:"Align Left",
            value: "left",
            icon : AlignLeftIcon,
        },
        {
            label : "Align Center",
            value : "center",
            icon : AlignCenterIcon,
        },
        {
            label : "Align Right",
            value : "Right",
            icon : AlignRightIcon
        },
        {
            label : "Align Justify",
            value : "Justify",
            icon : AlignJustifyIcon
        }
    ]


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-400/80">
                    <AlignLeftIcon className="size-4"/>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {alignments.map(({label, icon :Icon,value})=>(
                    <button
                        key={value}
                        onClick={()=>editor?.chain().focus().setTextAlign(value).run()}
                        className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-400/80",
                            editor?.isActive({textAlign : value}) && "bg-neutral-400/80"
                        )}
                    >
                        <Icon className="size-4"/>
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )

}

const ImageButton = () => {
    const { editor } = useEditorStore();
    const [imageUrl, setImageUrl] = useState("");
    const [isDialogueOpen, SetIsDialogueOpen] = useState(false);

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run()
    }

    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*"

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl);
            }
        }
        input.click()
    }


    const handleImageUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl);
            setImageUrl(imageUrl);
            SetIsDialogueOpen(false);
        }
    }

    return (
        <>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <button className="h-9  w-[25px] shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-400/80 overflow-hidden text-sm">
                        <ImageIcon className="size-5" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent >
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className="size-6 mr-2" />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => SetIsDialogueOpen(true)}>
                        <SearchIcon className="size-4 mr-2" />
                        Paste Image Url
                    </DropdownMenuItem>



                </DropdownMenuContent>

            </DropdownMenu>


            <Dialog open={isDialogueOpen} onOpenChange={SetIsDialogueOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert Image url </DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Insert Image url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                handleImageUrlSubmit();
                            }
                        }}
                    />

                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}>
                            Insert
                        </Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </>
    )
}


const LinkButton = () => {
    const { editor } = useEditorStore();
    const [value, setValue] = useState(editor?.getAttributes("link").href || "");

    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
        setValue("");
    }

    return (
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                setValue(editor?.getAttributes("link").href || "")
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button className="h-9  w-[25px] shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-400/80 overflow-hidden text-sm">
                    <Link2Icon className="size-4" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
                <Input
                    placeholder="https://example.com"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}

                />
                <Button
                    onClick={() => onChange(value)}
                >
                    Apply
                </Button>

            </DropdownMenuContent>

        </DropdownMenu>
    )
}

const HightLightColorButton = () => {
    const [showSketch, setShowSketch] = useState(false);
    const toggleSketch = () => {
        setShowSketch((prev) => !prev);
    }

    const { editor } = useEditorStore();
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run();
    }

    const value = editor?.getAttributes("highlight").color || "#ffffff"



    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-9  w-[25px] shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-400/80 overflow-hidden text-sm"
                >
                    <HighlighterIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>


            <DropdownMenuContent className="p-0">
                {!showSketch ? (
                    <>
                        <CirclePicker
                            color={value}
                            onChange={onChange} />
                        <span
                            onClick={toggleSketch}
                            className="cursor-pointer text-xs text-blue-500 hover:underline"
                        >
                            More Colors
                        </span>
                    </>
                ) : (
                    <>
                        <SketchPicker
                            color={value}
                            onChange={onChange} />
                        <span
                            onClick={toggleSketch}
                            className="cursor-pointer text-xs text-blue-500 hover:underline"
                        >
                            Back to Presets
                        </span>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const TextColorButton = () => {
    const [showSketch, setShowSketch] = useState(false);
    const { editor } = useEditorStore();

    const value = editor?.getAttributes("textStyle").color || "#000000";

    const toggleSketch = () => {
        setShowSketch((prev) => !prev);
    }

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run()
    };


    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-9  w-[25px] shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-400/80 overflow-hidden text-sm"
                >
                    <span className="text-sm">A</span>
                    <div className="h-0.5 w-full" style={{ backgroundColor: value }}></div>
                </button>
            </DropdownMenuTrigger>


            <DropdownMenuContent className="p-0 ml-[10px]">
                {!showSketch ? (
                    <>
                        <CirclePicker color={value} onChange={onChange} />
                        <span
                            onClick={toggleSketch}
                            className="cursor-pointer text-xs text-blue-500 hover:underline"
                        >
                            More Colors
                        </span>
                    </>
                ) : (
                    <>
                        <SketchPicker
                            color={value}
                            onChange={onChange} />
                        <span
                            onClick={toggleSketch}
                            className="cursor-pointer text-xs text-blue-500 hover:underline"
                        >
                            Back to Presets
                        </span>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>

    )

}


const HeadingLevelButton = () => {
    const { editor } = useEditorStore();

    const headings = [
        { label: "Normal text", value: 0, fontSize: "16px" },
        { label: "Heading 1", value: 1, fontSize: "32px" },
        { label: "Heading 2", value: 2, fontSize: "24px" },
        { label: "Heading 3", value: 3, fontSize: "20px" },
        { label: "Heading 4", value: 4, fontSize: "18px" },
        { label: "Heading 5", value: 5, fontSize: "16px" },
        { label: "Heading 6", value: 6, fontSize: "14px" },
    ];


    const getCurrentHeading = () => {
        for (let level = 1; level <= 5; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`
            }
        }
        return "Normal text"
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-[7] shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-400/80 overflow-hidden text-sm">
                    <span className="truncate ml-2 text-[15px]">
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>

            </DropdownMenuTrigger>


            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {headings.map(({ label, value, fontSize }) => (
                    <button
                        onClick={() => {
                            if (value === 0) {
                                editor?.chain().focus().setParagraph().run()
                            } else {
                                editor?.chain().focus().toggleHeading({ level: value as Level }).run()
                            }
                        }}
                        key={value}
                        style={{ fontSize }}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm text-sm hover:bg-neutral-400/80",
                            (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { level: value }) && "bg-neutral-400/80"
                        )}
                    >
                        {label}
                    </button>
                ))}

            </DropdownMenuContent>

        </DropdownMenu>
    )


}


const FontFamilyButton = () => {
    const { editor } = useEditorStore();
    const fonts = [
        { label: "Arial", value: "Arial" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Courier New", value: "Courier New" },
        { label: "Georgia", value: "Georgia" },
        { label: "Verdana", value: "Verdana" },
    ];

    const currentFont = editor?.getAttributes("textStyle").fontFamily || "Arial";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-400/80 overflow-hidden text-sm">
                    <span className="truncate ml-2 text-[15px]" style={{ fontFamily: currentFont }}>
                        {currentFont}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {fonts.map(({ label, value }) => (
                    <DropdownMenuItem
                        key={value}
                        onSelect={(e) => {
                            e.preventDefault(); // optional: prevents focus loss
                            editor?.chain().focus().setFontFamily(value).run();
                        }}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm text-sm hover:bg-neutral-400/80",
                            currentFont === value && "bg-neutral-400/80"
                        )}
                        style={{ fontFamily: value }}
                    >
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};




interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}

// using this to render or make the icon .. we make a component to render the icons 
const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
}: ToolbarButtonProps) => {
    return (
        <button
            onClick={onClick}
            // here we are using cn for dynamic classes in shadcn 
            className={cn(
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-400/80"
            )}
        >
            <Icon size={22} />
        </button>
    )
}

export const Toolbar = () => {
    const { editor } = useEditorStore();
    console.log("Toolbar Editor: ", editor); // this is called everytime we write something .. herefore has a history henc we pass this to useEditorStore and create a prop that can we sent to toolbar component so that it can toggle the history 

    const sections: {
        label: string,
        icon: LucideIcon,
        onClick: () => void,
        isActive?: boolean
    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run()
                }, {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run()
                }, {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print()
                }, {
                    label: "Toggle Spellcheck",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const dom = editor?.view.dom;
                        if (!dom) return;

                        const isEnabled = dom.getAttribute("spellcheck") === "true";
                        dom.setAttribute("spellcheck", (!isEnabled).toString());

                        // Optional: notify user
                        console.log("Spellcheck: " + (!isEnabled ? "ON" : "OFF"));
                    }
                }

            ], [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    isActive: editor?.isActive("bold"),
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                },
                {
                    label: "Italic",
                    icon: Italic,
                    isActive: editor?.isActive("italic"),
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                },
                {
                    label: "Underline",
                    icon: Underline,
                    isActive: editor?.isActive("underline"),
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),
                },
            ],
            [
                {
                    label: "Comment",
                    icon: MessageSquareIcon,
                    onClick: () => editor?.chain().focus().addPendingComment().run(),
                    isActive:editor?.isActive("liveblocksCommentMark"),
                },
                {
                    label: "List Todo",
                    icon: ListTodoIcon,
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                    isActive: editor?.isActive("taskList"),
                },
                {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run()

                }
            ]
        ]
    return (
        <div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 oberflow-x-auto">
            {
                sections[0].map((item) => (
                    <ToolbarButton key={item.label}{...item} />
                ))

            }
            <Separator orientation="vertical" className="h-7 bg-neutral-400" />
            <FontFamilyButton />
            <Separator orientation="vertical" className="h-7 bg-neutral-400" />
            <HeadingLevelButton />
            <Separator orientation="vertical" className="h-7 bg-neutral-400" />
            <FontSizeButton/>
            <Separator orientation="vertical" className="h-7 bg-neutral-400" />
            {
                sections[1].map((item) => (
                    <ToolbarButton key={item.label}{...item} />
                ))
            }

            <TextColorButton />
            <HightLightColorButton />
            <Separator orientation="vertical" className="h-7 bg-neutral-400" />
            <LinkButton />
            <ImageButton />
            <AlignButton/>
            <LineHeightButton/>
            <ListButton />
            {sections[2].map((item) => (
                <ToolbarButton key={item.label}{...item} />
            ))}



        </div>
    )
}