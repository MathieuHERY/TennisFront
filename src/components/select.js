export default function Select(props) {
    const optionsValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
    const handleChange = (e) => {
      props.handleChangeSelect(e.target.value, props.id);
    };
  
    return (
      <div>
        <label htmlFor={props.label}>Note</label>
        <select
          name={props.label}
          id={props.label}
          disabled={props.disabled}
          required
          value={props.value}
          onChange={handleChange}
        >
          {optionsValues.map((value, i) => {
            return <option key={value} value={value}>{value}</option>;
          })}
        </select>
      </div>
    );
  }
  