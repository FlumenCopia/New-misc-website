import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  isEmpty?: boolean;
  emptyMessage?: string;
}

export const Table: React.FC<TableProps> = ({
  headers,
  children,
  isEmpty = false,
  emptyMessage = 'No records found.',
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-xs">
      <table className="w-full text-left text-sm text-slate-800">
        <thead className="bg-slate-50 text-[12px] uppercase tracking-wider text-slate-600 border-b border-slate-200">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-5 py-3 font-semibold text-slate-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {isEmpty ? (
            <tr>
              <td
                colSpan={headers.length}
                className="px-6 py-12 text-center text-sm text-slate-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
};
