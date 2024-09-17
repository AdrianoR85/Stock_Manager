import numeral from 'numeral';

export default function NumberFormatter ({ value }) {
  // Formata o número para o formato com separador de milhar e duas casas decimais
  const formattedValue = numeral(value).format('0,0.00');

  return <span>{formattedValue}</span>;
};

