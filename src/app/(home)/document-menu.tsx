import { Button } from "@/components/ui/button"
import { ExternalLink, FilePenIcon, MoreVertical, TrashIcon } from "lucide-react"
import { Id } from "../../../convex/_generated/dataModel"

import { 
    DropdownMenu ,
    DropdownMenuItem, 
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";




interface DocumentMenuProps {
    documentId : Id<"documents">;
    title : string;
    OnNewTab : (id : Id<"documents">)=>void;
}


export const DocumentMenu = ({documentId, title, OnNewTab} : DocumentMenuProps) =>{
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="rounded-full" size="icon" variant="ghost">
                    <MoreVertical className="size-4" />

                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>

                <RenameDialog documentId={documentId} initalTitle = {title} >
                    <DropdownMenuItem
                        onSelect={(e)=>e.preventDefault()}
                        onClick={(e)=> e.stopPropagation()}
                    >
                        <FilePenIcon className="size-4 mr-2"/>
                        Rename
                    </DropdownMenuItem>
                </RenameDialog>



                <RemoveDialog documentId={documentId} >
                    <DropdownMenuItem
                        onSelect={(e)=>e.preventDefault()}
                        onClick={(e)=> e.stopPropagation()}
                    >
                        <TrashIcon className="size-4 mr-2"/>
                        Remove
                    </DropdownMenuItem>
                </RemoveDialog>
                <DropdownMenuItem
                onClick={()=> OnNewTab(documentId)}
                >
                    <ExternalLink className="size-4 mr-2" />
                    Open in a new Tab
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}