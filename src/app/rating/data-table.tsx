"use client";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  ColumnFiltersState,
  VisibilityState,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { usePlayerId } from "@/hooks/usePlayerId";

interface player_idRow {
  player_id: string;
}

interface DataTableProps<TData extends player_idRow, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTable = <TData extends player_idRow, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    tournament: false,
  });

  const table = useReactTable({
    data,
    columns,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { pagination, sorting, columnFilters, columnVisibility },
  });

  // Get the current player's ID from the custom hook
  const playerId = usePlayerId();

  return (
    <div className="container mx-auto">
      <div className="flex items-center py-4 justify-between w-full gap-20">
        <div className="flex space-x-2 w-full">
          <Input
            placeholder="Søg efter specifik spiller..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Rækker</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="default"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Forrige
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Næste
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table className="table-auto w-full">
          <TableHeader className="w-full table-fixed">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.column.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    row.original.player_id === playerId
                      ? "bg-[rgba(255,255,255,0.1)] text-white"
                      : ""
                  }
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Ingen resultater fundet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
