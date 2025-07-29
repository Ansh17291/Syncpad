'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, HighlighterIcon, ImageIcon, Italic, Link2Icon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageSquareIcon, MinusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheckIcon, Underline, Undo2Icon, UploadIcon, PlusIcon, ListCollapseIcon, MoreHorizontalIcon } from "lucide-react";
import { type Level } from "@tiptap/extension-heading"
import { type ColorResult, CirclePicker, SketchPicker } from "react-color";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const useResponsive = () => {
    const [screenSize, setScreenSize] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false
    });

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setScreenSize({
                isMobile: width < 640,
                isTablet: width >= 640 && width < 1024,
                isDesktop: width >= 1024
            });
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return screenSize;
};

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
                <button className="h-8 min-w-8 shrink-0 flex flex-col items-center justify-center rounded-md hover:bg-neutral-200/80 transition-colors">
                    <ListCollapseIcon className="size-4"/>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {lineHeights.map(({label,value})=>(
                    <button
                        key={value}
                        onClick={()=>editor?.chain().focus().setLineHeight(value).run()}
                        className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 transition-colors",
                            editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-200/80"
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
        <div className ="flex items-center gap-x-1">
            <button 
            onClick={decrement}
            className="h-8 w-8 shrink-0 flex items-center justify-center rounded-md hover:bg-neutral-200/80 transition-colors">
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
                    className="h-8 w-10 text-sm text-center border border-neutral-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                ):(
                    <button
                    onClick={()=>{
                        setIsEditing(true)
                        setFontSize(currentFontSize)
                    }}
                    className="h-8 w-10 text-center border border-neutral-300 text-sm rounded-md bg-white hover:bg-neutral-50 transition-colors"
                    >
                        {currentFontSize}
                    </button>
                )
            }

            <button 
            onClick={increment}
            className="h-8 w-8 shrink-0 flex items-center justify-center rounded-md hover:bg-neutral-200/80 transition-colors">
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
                <button className="h-8 min-w-8 shrink-0 flex flex-col items-center justify-center rounded-md hover:bg-neutral-200/80 transition-colors">
                    <ListIcon className="size-4"/>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {lists.map(({label, icon :Icon,onClick, isActive})=>(
                    <button
                        key={label}
                        onClick={onClick}
                        className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 transition-colors",
                            isActive() && "bg-neutral-200/80"
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
            value : "right",
            icon : AlignRightIcon
        },
        {
            label : "Align Justify",
            value : "justify",
            icon : AlignJustifyIcon
        }
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-8 min-w-8 shrink-0 flex flex-col items-center justify-center rounded-md hover:bg-neutral-200/80 transition-colors">
                    <AlignLeftIcon className="size-4"/>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {alignments.map(({label, icon :Icon,value})=>(
                    <button
                        key={value}
                        onClick={()=>editor?.chain().focus().setTextAlign(value).run()}
                        className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 transition-colors",
                            editor?.isActive({textAlign : value}) && "bg-neutral-200/80"
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
            setImageUrl("");
            SetIsDialogueOpen(false);
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-8 w-8 shrink-0 flex flex-col items-center justify-center rounded-md hover:bg-neutral-200/80 transition-colors">
                        <ImageIcon className="size-4" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className="size-4 mr-2" />
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
                        <DialogTitle>Insert Image URL</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Insert Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
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
                <button className="h-8 w-8 shrink-0 flex flex-col items-center justify-center rounded-md hover:bg-neutral-200/80 transition-colors">
                    <Link2Icon className="size-4" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
                <Input
                    placeholder="https://example.com"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button onClick={() => onChange(value)}>
                    Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HightLightColorButton = () => {
    const [showSketch, setShowSketch] = useState(false);
    const { editor } = useEditorStore();
    
    const toggleSketch = () => {
        setShowSketch((prev) => !prev);
    }

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run();
    }

    const value = editor?.getAttributes("highlight").color || "#ffffff"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-8 w-8 shrink-0 flex flex-col items-center justify-center rounded-md hover:bg-neutral-200/80 transition-colors">
                    <HighlighterIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-2">
                {!showSketch ? (
                    <div className="space-y-2">
                        <CirclePicker color={value} onChange={onChange} />
                        <button
                            onClick={toggleSketch}
                            className="w-full text-xs text-blue-600 hover:text-blue-800 underline"
                        >
                            More Colors
                        </button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <SketchPicker color={value} onChange={onChange} />
                        <button
                            onClick={toggleSketch}
                            className="w-full text-xs text-blue-600 hover:text-blue-800 underline"
                        >
                            Back to Presets
                        </button>
                    </div>
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
                <button className="h-8 w-8 shrink-0 flex flex-col items-center justify-center rounded-md hover:bg-neutral-200/80 transition-colors">
                    <span className="text-sm font-semibold">A</span>
                    <div className="h-0.5 w-4 mt-0.5" style={{ backgroundColor: value }}></div>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-2">
                {!showSketch ? (
                    <div className="space-y-2">
                        <CirclePicker color={value} onChange={onChange} />
                        <button
                            onClick={toggleSketch}
                            className="w-full text-xs text-blue-600 hover:text-blue-800 underline"
                        >
                            More Colors
                        </button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <SketchPicker color={value} onChange={onChange} />
                        <button
                            onClick={toggleSketch}
                            className="w-full text-xs text-blue-600 hover:text-blue-800 underline"
                        >
                            Back to Presets
                        </button>
                    </div>
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
        for (let level = 1; level <= 6; level++) {
            if (editor?.isActive("heading", { level })) {
                return `H${level}`
            }
        }
        return "Normal"
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-8 min-w-[60px] px-2 shrink-0 flex items-center justify-center rounded-md hover:bg-neutral-200/80 transition-colors text-sm font-medium">
                    <span className="truncate">
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className="ml-1 size-3 shrink-0" />
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
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm text-sm hover:bg-neutral-200/80 transition-colors text-left",
                            (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { level: value }) && "bg-neutral-200/80"
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
                <button className="h-8 min-w-[100px] px-2 shrink-0 flex items-center justify-between rounded-md hover:bg-neutral-200/80 transition-colors text-sm">
                    <span className="truncate" style={{ fontFamily: currentFont }}>
                        {currentFont}
                    </span>
                    <ChevronDownIcon className="ml-1 size-3 shrink-0" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {fonts.map(({ label, value }) => (
                    <DropdownMenuItem
                        key={value}
                        onSelect={(e) => {
                            e.preventDefault();
                            editor?.chain().focus().setFontFamily(value).run();
                        }}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm text-sm hover:bg-neutral-200/80 transition-colors cursor-pointer",
                            currentFont === value && "bg-neutral-200/80"
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

// Mobile overflow menu component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MobileOverflowMenu = ({ items }: { items: any[] }) => {
    if (items.length === 0) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-8 w-8 shrink-0 flex items-center justify-center rounded-md hover:bg-neutral-200/80 transition-colors">
                    <MoreHorizontalIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {items.map((item, index) => (
                    <button
                        key={index}
                        onClick={item.onClick}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 transition-colors text-left",
                            item.isActive && "bg-neutral-200/80"
                        )}
                    >
                        <item.icon className="size-4" />
                        <span className="text-sm">{item.label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
    size?: "sm" | "md";
}

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
    size = "md",
}: ToolbarButtonProps) => {
    const sizeClasses = {
        sm: "h-7 min-w-7",
        md: "h-8 min-w-8"
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center justify-center rounded-md hover:bg-neutral-200/80 transition-colors",
                sizeClasses[size],
                isActive && "bg-neutral-300/80 shadow-sm"
            )}
        >
            <Icon className="size-4" />
        </button>
    )
}

export const Toolbar = () => {
    const { editor } = useEditorStore();
    const { isMobile, isTablet, isDesktop } = useResponsive();

    const primaryActions = [
        {
            label: "Undo",
            icon: Undo2Icon,
            onClick: () => editor?.chain().focus().undo().run()
        },
        {
            label: "Redo",
            icon: Redo2Icon,
            onClick: () => editor?.chain().focus().redo().run()
        }
    ];

    const formatActions = [
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
    ];

    const secondaryActions = [
        {
            label: "Print",
            icon: PrinterIcon,
            onClick: () => window.print()
        },
        {
            label: "Spellcheck",
            icon: SpellCheckIcon,
            onClick: () => {
                const dom = editor?.view.dom;
                if (!dom) return;
                const isEnabled = dom.getAttribute("spellcheck") === "true";
                dom.setAttribute("spellcheck", (!isEnabled).toString());
            }
        },
        {
            label: "Comment",
            icon: MessageSquareIcon,
            onClick: () => editor?.chain().focus().addPendingComment().run(),
            isActive: editor?.isActive("liveblocksCommentMark"),
        },
        {
            label: "Todo List",
            icon: ListTodoIcon,
            onClick: () => editor?.chain().focus().toggleTaskList().run(),
            isActive: editor?.isActive("taskList"),
        },
        {
            label: "Remove Formatting",
            icon: RemoveFormattingIcon,
            onClick: () => editor?.chain().focus().unsetAllMarks().run()
        }
    ];

    // Items that will be moved to overflow menu based on screen size
    const getOverflowItems = () => {
        const items = [];

        if (isMobile) {
            // On mobile, move font family and heading to overflow
            items.push(
                {
                    label: "Font Family",
                    icon: () => <span className="text-xs font-bold">Aa</span>,
                    onClick: () => {}, // This would need to trigger FontFamilyButton dropdown
                },
                {
                    label: "Heading",
                    icon: () => <span className="text-xs font-bold">H1</span>,
                    onClick: () => {}, // This would need to trigger HeadingLevelButton dropdown
                }
            );
        }

        if (isMobile || isTablet) {
            // On mobile and tablet, move color controls to overflow
            items.push(
                {
                    label: "Text Color",
                    icon: () => <span className="text-xs font-bold" style={{ color: editor?.getAttributes("textStyle").color || "#000000" }}>A</span>,
                    onClick: () => {}, // This would need to trigger TextColorButton dropdown
                },
                {
                    label: "Highlight",
                    icon: HighlighterIcon,
                    onClick: () => {}, // This would need to trigger HightLightColorButton dropdown
                }
            );
        }

        if (isMobile) {
            // On mobile, move media and alignment controls to overflow
            items.push(
                {
                    label: "Link",
                    icon: Link2Icon,
                    onClick: () => {}, // This would need to trigger LinkButton dropdown
                },
                {
                    label: "Image",
                    icon: ImageIcon,
                    onClick: () => {}, // This would need to trigger ImageButton dropdown
                },
                {
                    label: "Align",
                    icon: AlignLeftIcon,
                    onClick: () => {}, // This would need to trigger AlignButton dropdown
                },
                {
                    label: "Line Height",
                    icon: ListCollapseIcon,
                    onClick: () => {}, // This would need to trigger LineHeightButton dropdown
                },
                {
                    label: "Lists",
                    icon: ListIcon,
                    onClick: () => {}, // This would need to trigger ListButton dropdown
                }
            );
        }

        // Add secondary actions to overflow on smaller screens
        if (isMobile) {
            items.push(...secondaryActions);
        }

        return items;
    };

    return (
        <div className="w-full bg-white border-b border-neutral-200 px-2 sm:px-4 py-2 rounded-[20px]">
            <div className="flex items-center gap-1 sm:gap-2 w-full overflow-x-auto">
                {/* Primary actions - always visible */}
                <div className="flex items-center gap-1">
                    {primaryActions.map((item) => (
                        <ToolbarButton key={item.label} {...item} />
                    ))}
                </div>

                <Separator orientation="vertical" className="h-6 bg-neutral-300 shrink-0" />

                {/* Font controls - responsive layout */}
                {!isMobile && (
                    <div className="flex items-center gap-1">
                        <FontFamilyButton />
                        {isDesktop && <HeadingLevelButton />}
                    </div>
                )}
                
                <FontSizeButton />

                <Separator orientation="vertical" className="h-6 bg-neutral-300 shrink-0" />

                {/* Format actions - always visible */}
                <div className="flex items-center gap-1">
                    {formatActions.map((item) => (
                        <ToolbarButton key={item.label} {...item} />
                    ))}
                </div>

                {/* Color controls - hide on mobile and tablet */}
                {isDesktop && (
                    <>
                        <Separator orientation="vertical" className="h-6 bg-neutral-300 shrink-0" />
                        <div className="flex items-center gap-1">
                            <TextColorButton />
                            <HightLightColorButton />
                        </div>
                    </>
                )}

                {/* Media and alignment - hide on mobile */}
                {!isMobile && (
                    <>
                        <Separator orientation="vertical" className="h-6 bg-neutral-300 shrink-0" />
                        <div className="flex items-center gap-1">
                            <LinkButton />
                            <ImageButton />
                            <AlignButton />
                            <LineHeightButton />
                            <ListButton />
                        </div>
                    </>
                )}

                {/* Secondary actions - show some on desktop, others in overflow */}
                {isDesktop && (
                    <>
                        <Separator orientation="vertical" className="h-6 bg-neutral-300 shrink-0" />
                        <div className="flex items-center gap-1">
                            <ToolbarButton 
                                icon={MessageSquareIcon}
                                onClick={() => editor?.chain().focus().addPendingComment().run()}
                                isActive={editor?.isActive("liveblocksCommentMark")}
                            />
                            <ToolbarButton 
                                icon={ListTodoIcon}
                                onClick={() => editor?.chain().focus().toggleTaskList().run()}
                                isActive={editor?.isActive("taskList")}
                            />
                            <ToolbarButton 
                                icon={RemoveFormattingIcon}
                                onClick={() => editor?.chain().focus().unsetAllMarks().run()}
                            />
                        </div>
                    </>
                )}

                {/* Overflow menu - show when there are items to overflow */}
                <MobileOverflowMenu items={getOverflowItems()} />
            </div>
        </div>
    )
}