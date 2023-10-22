export const isNumber = (checkValue: string) => {
  const numberExpression = /[0-9]/;

  return numberExpression.test(checkValue);
};
