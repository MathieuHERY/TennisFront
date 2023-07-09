export default function TextInput(props) {
    const handleChange = (e) => {
      props.handleChangeInput(e.target.value, props.id);
    };
  
    return (
      <div>
        <label htmlFor={props.label}>Nom</label>
        <input
          type="text"
          id={props.label}
          name={props.label}
          required
          disabled={props.disabled}
          value={props.value}
          onChange={handleChange}
        />
      </div>
    );
  }
  