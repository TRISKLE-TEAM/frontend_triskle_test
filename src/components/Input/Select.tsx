interface SelectProps extends React.HTMLAttributes<HTMLSelectElement>  {
  label: string;
  options: string[];
}

export function Select({ label, options, ...rest }: SelectProps) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select  {...rest} className="select w-full select-primary">
        {options.map((option) => {
         return ( <option key={option}>{option}</option>);
        })}
      </select>
    </label>
  );
}
