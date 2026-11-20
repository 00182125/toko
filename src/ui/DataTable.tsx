// Tabla sencilla: una fila de encabezados y filas de texto.
// Las columnas se toman de "columns"; cada fila trae sus celdas en el mismo orden.
export function DataTable({
  columns,
  rows,
  ariaLabel,
}: {
  columns: string[]
  rows: string[][]
  ariaLabel: string
}) {
  return (
    <div className="query-table" role="table" aria-label={ariaLabel}>
      <div className="query-head" role="row">
        {columns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>
      {rows.map((cells) => (
        <div className="query-row" role="row" key={cells[0]}>
          {cells.map((cell, index) => (
            <span key={index}>{cell}</span>
          ))}
        </div>
      ))}
    </div>
  )
}
