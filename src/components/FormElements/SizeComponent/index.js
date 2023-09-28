export default function SizeComponent({ data, selected = [], onClick }) {
    return data && data.length ? (
      <div className="flex flex-wrap gap-1">
        {data.map((dataItem) => (
          <label
            onClick={() => onClick(dataItem)}
            key={dataItem.id}
          >
            <span
              className={`rounded-lg border px-2 text-sm font-semibold ${
                selected &&
                selected.length &&
                selected.map((item) => item.id).indexOf(dataItem.id) !== -1
                  ? "text-[#F85606] border-[#F85606]"
                  : "border-gray-400 text-gray-400"
              }`}
            >
              {dataItem.label}
            </span>
          </label>
        ))}
      </div>
    ) : null;
  }
  