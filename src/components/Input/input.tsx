interface InputProps {
  name: string;
  input_type: string;
}

const Input = ({ name, input_type }: InputProps) => {
  return <input type={input_type} name={name} className="" />;
};

export default Input;
