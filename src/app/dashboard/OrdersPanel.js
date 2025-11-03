//needed to create new component file for this tile
'use client';

import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

//filter options for dropdown
const FILTER_OPTIONS = [
  { value: 'all', label: 'All fields' },
  { value: 'ID', label: 'ID' },
  { value: 'Customer', label: 'Customer' },
  { value: 'Status', label: 'Status' },
  { value: 'Dates', label: 'Date' },
  { value: 'Notes', label: 'Notes' },
];

//badge component for status display
function StatusBadge({ status }) {
  const key = String(status || '').toLowerCase(); //uses tolowercase for easier comparison

  if (key.includes('pending')) {
    return (
      <span className="inline-block rounded-md bg-gray-200 px-2 py-1 font-semibold text-gray-900">
        {status}
      </span>
    );
  }

  if (
    key.includes('in progress') ||
    key.includes('in-progress') ||
    key.includes('progress')
  ) {
    return (
      <span className="inline-block rounded-md bg-green-200 px-2 py-1 font-semibold text-green-900">
        {status}
      </span>
    );
  }

  return (
    <span className="inline-block rounded-md bg-blue-200 px-2 py-1 font-semibold text-blue-900">
      {status}
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
export default function OrdersPanel({ rows }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState('all');

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return rows;

    const fieldsToSearch =
      filterField === 'all'
        ? FILTER_OPTIONS.filter(option => option.value !== 'all').map(
            option => option.value
          )
        : [filterField];

    return rows.filter(row =>
      fieldsToSearch.some(field =>
        normalizeValue(row, field).toLowerCase().includes(term)
      )
    );
  }, [rows, searchTerm, filterField]);

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

        {/* Filter dropdown */}
        <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <span>Filter</span>
          <select
            value={filterField}
            onChange={event => setFilterField(event.target.value)}
            className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {FILTER_OPTIONS.map(option => (
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
                  <StatusBadge status={row.Status} />
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
