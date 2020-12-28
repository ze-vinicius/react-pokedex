import React, {
  ChangeEvent,
  FormEvent,
  InputHTMLAttributes,
  useCallback,
  useState,
} from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  handleSearch(id: string): Promise<void>;
}

const SearchInput: React.FC<InputProps> = ({ handleSearch, ...rest }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      handleSearch(inputValue);
      setInputValue('');
    },
    [handleSearch, inputValue],
  );

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input {...rest} onChange={handleChange} value={inputValue} />
        <button type="submit">Search</button>
      </form>
    </Container>
  );
};

export default SearchInput;
