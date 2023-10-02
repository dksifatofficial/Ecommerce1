export default function ColorTileComponent({ data, selected = [], onClick, className }) {
    return data && data.length ? (
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {data.map((dataItem) => (
          <label
            onClick={() => onClick(dataItem)}
            className={`cursor-pointer w-[100px] border-2 flex flex-wrap justify-center rounded-lg ${
              selected &&
              selected.length &&
              selected.map((item) => item.id).indexOf(dataItem.id) !== -1
                ? "border-green-600"
                : ""
            } ${className}`}
            key={dataItem.id}
          >
            <span
              className={`rounded-lg text-black px-6 font-bold ${
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
  