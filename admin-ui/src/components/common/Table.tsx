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
    <div className="overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-800/60 shadow-sm">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-700/80">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-6 py-3.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/60">
          {isEmpty ? (
            <tr>
              <td
                colSpan={headers.length}
                className="px-6 py-10 text-center text-slate-400"
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
