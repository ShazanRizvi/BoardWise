import React, { useState } from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import "../../App.css";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by email..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="relative rounded-md border border-primary-100 max-h-96 overflow-y-auto scrollbar-hidden">
        <Table className=" w-full">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <DrawerTrigger asChild key={row.id}>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => {
                        setSelectedRow(row.original), setIsDrawerOpen(true);
                        console.log("Drawer open: ", isDrawerOpen);
                      }} // Set selected row data
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </DrawerTrigger>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <DrawerContent className='flex w-full'>
              <DrawerHeader >
                <DrawerTitle>User Details</DrawerTitle>
                <DrawerDescription>
                  Details of the selected user are shown below.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                {selectedRow && (
                  <div className=" bg-gradient-to-tr from-primary-100 to-secondary-100 rounded-lg p-4">
                    {/* <pre className="text-sm">
                    {JSON.stringify(selectedRow, null, 2)}
                  </pre> */}
                    <div>
                      <h2 className="text-lg text-primary-800 font-bold">
                        {selectedRow.username}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {selectedRow.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedRow.role}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedRow.position}
                      </p>
                      <a
                        className="text-sm  cursor-pointer underline text-primary-500"
                        href={selectedRow?.inviteLink} // Use the invite link dynamically
                        target="_blank" // Opens in a new tab
                        rel="noopener noreferrer"
                      >
                        {selectedRow.inviteLink}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <DrawerFooter>
                <Button className="w-full" onClick={() => setIsDrawerOpen(false)}>Close</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>
            {Array.from({ length: table.getPageCount() }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={index === table.getState().pagination.pageIndex}
                  onClick={() => table.setPageIndex(index)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
