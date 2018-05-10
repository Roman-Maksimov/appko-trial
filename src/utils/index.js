export const getProp = (obj, prop) => prop.split('.').reduce((prev, curr) => prev[curr], obj);
