export default function ColorTileComponent({ data, selected = [], onClick, className }) {
    return data && data.length ? (
      <div className="flex flex-wrap items-center gap-2">
        {data.map((dataItem) => (
          <label
            onClick={() => onClick(dataItem)}
            className={`cursor-pointer ring-2 flex flex-wrap justify-center text-xs lg:text-sm overflow-hidden
            ${selected &&
              selected.length &&
              selected.map((item) => item.id).indexOf(dataItem.id) !== -1
                ? "ring-green-500"
                : "ring-slate-200"
            } ${className}`}
            key={dataItem.id}
          >
            <span
              className={`text-xs px-4 lg:text-sm text-black font-bold ${
                selected &&
                selected.length &&
                selected.map((item) => item.id).indexOf(dataItem.id) !== -1
                  ? ""
                  : ""
              } ${className}`}
            >
              {dataItem.label}
            </span>
          </label>
        ))}
      </div>
    ) : null;
  }
  