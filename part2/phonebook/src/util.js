export const isDuplicated = (objArr, value, field) => {
  let exist = false;
  for (let i = 0; i < objArr.length; i++) {
    if (value === objArr[i][field]) {
      exist = true;
    }
  }
  return exist;
};

export const ifContainsString = (full, part) =>
  full.toLowerCase().indexOf(part.toLowerCase()) >= 0;
