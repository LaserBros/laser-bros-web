export const getFormattedSubquote = (quote, subquoteNumber) => {
  if (!subquoteNumber || typeof subquoteNumber !== 'string') return subquoteNumber;

  const prefix = quote.finishing_id && quote.binding_option !== "no" && quote.bend_count >= 1
    ? "B-"
    : "";

  return subquoteNumber.replace(/^(\w+-\d+-)/, `$1${prefix}`);
};


  export const getFormattedSubquoteNumber = (quote, subquoteNumber) => {
    const prefix = quote.finishing_id && quote.binding_option !== "no" && quote.bend_count >= 1 ? "B-" : "";

  return subquoteNumber.replace(/^(\d+-)/, `$1${prefix}`);
  };


  export const getFormattedSubquoteNumberFirst = (quote, subquoteNumber) => {
    const prefix =
      quote.finishing_id && quote.binding_option !== "no" && quote.bend_count >= 1
        ? "B-"
        : "";
  
    // Ensure prefix is added only if it's not already there
    return subquoteNumber.startsWith(prefix) ? subquoteNumber : `${prefix}${subquoteNumber}`;
  };