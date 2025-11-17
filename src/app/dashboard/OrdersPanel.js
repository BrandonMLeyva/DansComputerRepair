//needed to create new component file for this tile
'use client';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

// Status choices for filtering and updates
const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'Completed', label: 'Complete' },
  { value: 'In progress', label: 'In progress' },
  { value: 'Pending', label: 'Pending' },
];
const STATUS_UPDATE_OPTIONS = [
  { value: 'Completed', label: 'Complete' },
  { value: 'In progress', label: 'In progress' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Cancelled', label: 'Cancelled' }, // keep legacy/status edge cases
];

// Sort choices
const SORT_OPTIONS = [
  { value: 'az', label: 'A-Z (Customer)' },
  { value: 'date', label: 'Date' },
  { value: 'id', label: 'ID' },
];

const MONTH_OPTIONS = [
  { value: 'all', label: 'All months' },
  { value: 'Jan', label: 'Jan' },
  { value: 'Feb', label: 'Feb' },
  { value: 'Mar', label: 'Mar' },
  { value: 'Apr', label: 'Apr' },
  { value: 'May', label: 'May' },
  { value: 'Jun', label: 'Jun' },
  { value: 'Jul', label: 'Jul' },
  { value: 'Aug', label: 'Aug' },
  { value: 'Sep', label: 'Sep' },
  { value: 'Oct', label: 'Oct' },
  { value: 'Nov', label: 'Nov' },
  { value: 'Dec', label: 'Dec' },
];

//badge component for status display
function StatusBadge({ status, updateStatus, row, router }) {
  const key = String(status || '').toLowerCase(); //uses tolowercase for easier comparison

  const colorClass = () => {
    if (key.includes('pending')) return 'bg-gray-200 text-gray-900';
    if (
      key.includes('in progress') ||
      key.includes('in-progress') ||
      key.includes('progress')
    )
      return 'bg-green-200 text-green-900';
    if (key.includes('cancel')) return 'bg-red-200 text-red-900';
    return 'bg-blue-200 text-blue-900';
  };

  return (
    <span className={`inline-block rounded-md px-2 py-1 font-semibold ${colorClass()}`}>
      <select
        value={status}
        onChange={async Event => {
          updateStatus(row.ID, Event.target.value);
          router.refresh();
        }}
      >
        {STATUS_UPDATE_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </span>
  );
}

//function to normalize values for searching
function normalizeValue(row, field) {
  const value = row?.[field];
  if (value == null) return '';
  if (field === 'Dates') {
    return dayjs(value).format('MMM DD YYYY');
  }
  return String(value);
}

//main tile component
export default function OrdersPanel({ rows, updateStatus }) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('az');
  const [monthFilter, setMonthFilter] = useState('all');

  const filteredRows = useMemo(() => {
    const byStatus =
      statusFilter === 'all'
        ? rows
        : rows.filter(
            row =>
              String(row?.Status || '').toLowerCase() ===
              statusFilter.toLowerCase()
          );

    const byMonth =
      monthFilter === 'all'
        ? byStatus
        : byStatus.filter(row => {
            const date = dayjs(row?.Dates);
            if (!date.isValid()) return false;
            return date.format('MMM') === monthFilter;
          });

    const term = searchTerm.trim().toLowerCase();
    const searched = !term
      ? byMonth
      : byMonth.filter(row =>
          ['ID', 'Customer', 'Status', 'Dates', 'Notes'].some(field =>
            normalizeValue(row, field).toLowerCase().includes(term)
          )
        );

    const sorted = [...searched].sort((a, b) => {
      if (sortField === 'az') {
        return String(a?.Customer || '').localeCompare(
          String(b?.Customer || '')
        );
      }
      if (sortField === 'date') {
        const aDate = dayjs(a?.Dates);
        const bDate = dayjs(b?.Dates);
        if (!aDate.isValid() && !bDate.isValid()) return 0;
        if (!aDate.isValid()) return 1;
        if (!bDate.isValid()) return -1;
        return bDate.valueOf() - aDate.valueOf();
      }
      if (sortField === 'id') {
        const aId = a?.ID ?? '';
        const bId = b?.ID ?? '';
        const aNum = Number(aId);
        const bNum = Number(bId);
        const bothNumeric =
          !Number.isNaN(aNum) && !Number.isNaN(bNum);
        if (bothNumeric) return aNum - bNum;
        return String(aId).localeCompare(String(bId));
      }
      return 0;
    });

    return sorted;
  }, [rows, searchTerm, statusFilter, sortField]);

  return (
    <div className="rounded-none bg-gray-100 p-4 text-gray-900">
      {/* Top controls: search + filter */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {/* Search input */}
        <div className="relative flex-1 min-w-[240px] max-w-[420px]">
          <input
            type="text"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
            placeholder="Search orders"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status filter dropdown */}
        <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <span>Status</span>
          <select
            value={statusFilter}
            onChange={event => setStatusFilter(event.target.value)}
            className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {STATUS_FILTER_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {/* Month filter dropdown */}
        <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <span>Month</span>
          <select
            value={monthFilter}
            onChange={event => setMonthFilter(event.target.value)}
            className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {MONTH_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {/* Sort dropdown */}
        <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <span>Sort</span>
          <select
            value={sortField}
            onChange={event => setSortField(event.target.value)}
            className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Table wrapper with scroll */}
      <div className="max-h-96 overflow-y-auto rounded border border-gray-200 bg-white">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 bg-gray-50 text-gray-700">
            <tr className="border-b-2 border-gray-200">
              <th className="px-3 py-2 font-semibold">ID</th>
              <th className="px-3 py-2 font-semibold">Customer</th>
              <th className="px-3 py-2 font-semibold">Status</th>
              <th className="px-3 py-2 font-semibold">Date</th>
              <th className="px-3 py-2 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {filteredRows.map((row, index) => (
              <tr
                key={row.ID ?? index}
                className="odd:bg-white even:bg-gray-50"
              >
                <td className="px-3 py-3 align-top">{row.ID}</td>
                <td className="px-3 py-3 align-top">{row.Customer}</td>
                <td className="px-3 py-3 align-top">
                  <StatusBadge
                    status={row.Status}
                    updateStatus={updateStatus}
                    row={row}
                    router={router}
                  />
                </td>
                <td className="px-3 py-3 align-top">
                  {normalizeValue(row, 'Dates')}
                </td>
                <td className="px-3 py-3 align-top">{row.Notes}</td>
              </tr>
            ))}

            {filteredRows.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-6 text-center text-sm text-gray-500"
                >
                  No orders match the search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
