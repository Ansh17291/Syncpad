import { PaginationStatus } from "convex/react"
import { Doc } from "../../../convex/_generated/dataModel"

import {
    Table, 
    TableBody, 
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DocumentsTableProps {
    documents : Doc<"documents">[] | undefined
    laodMore : (numItems : number)=>void,
    status: PaginationStatus;
}


export const DocumentsTable = ({
    documents,
    laodMore,
    status
}: DocumentsTableProps) =>{
    return (
        <div className="max-w-screen-xl max-auto px-16 py-6 flex flex-col gap-5">
            {document == undefined ? (
                <div>
                    
                </div>
            ):(

            )}
        </div>
    )
}