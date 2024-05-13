import classNames from "classnames";

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export function Tag({ children, className, ...rest }: TagProps) {
  return (
    <div
      {...rest}
      className={classNames(
        "flex  flex-col p-2 font-semibold w-fit h-8 bg-primary text-md text-white rounded-full justify-center align-middle",
        className
      )}
    >
      {children}
    </div>
  );
}
