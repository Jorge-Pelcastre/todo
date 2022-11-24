/* eslint-disable react/react-in-jsx-scope */
const capitalize = (string) => string[0].toUpperCase() + string.substring(1);

function Input({
  required = false,
  value,
  handleInput,
  name,
  label,
  type = "text",
  errors
}) {
  return (
    <div className="input-group">
      <label htmlFor={name}>
        {label ?? capitalize(name)}{" "}
        {required && <span className="input-required">*</span>}
      </label>
      <input
        name={name}
        id={name}
        onInput={handleInput}
        type={type}
        defaultValue={value}
      />
      {errors.has(name) && <Error message={errors.get(name)} />}
    </div>
  );
}

function Checkbox({
  required = false,
  checked,
  handleInput,
  name,
  label,
  errors
}) {
  return (
    <div className="input-check-group">
      <label htmlFor={name}>
        {label ?? capitalize(name)}{" "}
        {required && <span className="input-required">*</span>}
      </label>
      <input
        name={name}
        id={name}
        onInput={handleInput}
        type="checkbox"
        defaultChecked={checked}
      />
      <div>
        {errors.has(name) && <Error message={errors.get(name)} />}
      </div>
    </div>
  );
}

function Textarea({
  required = false,
  value,
  handleInput,
  name,
  label,
  cols, 
  rows,
  errors
}) {
  return (
    <div className="input-group">
      <label htmlFor={name}>
        {label ?? capitalize(name)}{" "}
        {required && <span className="input-required">*</span>}
      </label>
      <textarea
        name={name}
        id={name}
        onInput={handleInput}
        defaultValue={value}
        cols={cols ?? 20}
        rows={rows ?? 2}
      />
      {errors.has(name) && <Error message={errors.get(name)} />}
    </div>
  );
}

function Error({ message }) {
  return <span style={{ color: "red" }}>{message}</span>;
}

export { Input, Textarea, Checkbox, Error };
