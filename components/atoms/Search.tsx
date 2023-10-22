import { ChangeEventHandler, FC, FocusEventHandler } from "react";

type SearchProps = {
  value: string | number;
  placeholder?: string;
  onChange?: ChangeEventHandler;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
};

const Search: FC<SearchProps> = (props) => {
  const {
    value = "",
    placeholder,
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
  } = props;

  return (
    <div className="shadow-sm flex flex-row bg-gray-100 items-center rounded-lg flex-1">
      <input
        type="text"
        name="search"
        id="search"
        className="custom-input w-full px-2 text-sm bg-transparent border-0 rounded-md placeholder:text-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Search;
