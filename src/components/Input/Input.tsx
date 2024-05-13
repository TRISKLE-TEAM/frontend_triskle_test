import classNames from "classnames";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  type: "number" | "text" | "email";
}

export function Input({ label, type, className, ...rest }: InputProps) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}

        className={classNames(
          "input input-primary input-bordered w-full",
          className
        )}
        {...rest}
      />
    </label>
  );
}
