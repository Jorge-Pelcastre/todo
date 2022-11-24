/* eslint-disable no-param-reassign */
import lines from '../lang/en.json';

const MCD = (a, b) => {
    while(b > 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

const required = (value) =>
  value !== undefined && (value.trim ? value.trim().length > 0 : true);

const number = (value) => typeof value === "number";

const boolean = (value) => typeof value === "boolean";

const string = (value) => typeof value === "string";

const date = (value) => value instanceof Date;

const array = (value) => value instanceof Array;

const file = (value) => value instanceof File;

const accepted = (value) => value;

const max = (value, maxValue) => {
    maxValue = Number(maxValue);
    if (typeof value === "string" || value instanceof Array)
        return value.length <= maxValue;
    if (value instanceof File) {
        return value.size <= maxValue;
    }
    if (typeof value === "number") return value <= maxValue;
    throw Error(`${value} not supported`);
};

const min = (value, minValue) => {
    minValue = Number(minValue);
    if (typeof value === "string" || value instanceof Array)
        return value.length >= minValue;
    if (value instanceof File) return value.size >= minValue;
    if (typeof value === "number") return value >= minValue;
    throw Error(`${value} not supported`);
};

const gt = (value, maxValue) => {
    maxValue = Number(maxValue);
    if (typeof value === "string" || value instanceof Array)
        return value.length > maxValue;
    if (value instanceof File) return value.size > maxValue;
    if (typeof value === "number") return value > maxValue;
    throw Error(`${value} not supported`);
};

const lt = (value, minValue) => {
    minValue = Number(minValue);
    if (typeof value === "string" || value instanceof Array)
    return value.length < minValue;
    if (value instanceof File) return value.size < minValue;
    if (typeof value === "number") return value < minValue;
    throw Error(`${value} not supported`);
};

const size = (value, equal) => {
    equal = Number(equal);
    if (typeof value === "string" || value instanceof Array)
        return value.length === equal;
    if (value instanceof File) return value.size === equal;
    if (typeof value === "number") return value === equal;
    throw Error(`${value} not supported`);
};

const between = (value, minValue, maxValue) =>
  min(value, minValue) && max(value, maxValue);

const regexp = (value, exp) => {
    exp = new RegExp(exp);
    return exp.test(value);
};

const includes = (value, ...options) => options.slice(0, -2).includes(value);

const notIncludes = (...params) => !includes(...params);

const unique = (...params) => notIncludes(...params);

const confirm = (value, _, attribute, data) =>
  value === data[`${attribute}_confirm`];

const exists = (value, table, column, data) =>
  data[table].some(row  => row[column] === value);

const before = (value, beforeDate) => value.getTime() < new Date(beforeDate);

const after = (value, afterDate) => value.getTime() > new Date(afterDate);

const image = (value) => value.type && value.type.includes("image");

const mime = (value, ...mimes) => mimes.slice(0, -2).includes(value.type);

const dimensions = (value, ...data) => {
    const restrict = data.map((el) => el.split("="));
    const dim = (async () => {
        await new Promise((resolve) => {
        const fr = new FileReader();
        fr.onload = () => {
            const img = new Image();
            img.onload = () => {
            const { width, height } = img;
            const mcd = MCD(width, height);
            const ratio = `${width / mcd}/${height / mcd}`;
            resolve({ width, height, ratio });
            };
            img.src = fr.result;
        };
        fr.readAsDataURL(value);
        });
  })();
  return restrict.every(([key, dimension]) => dim[key] === dimension);
};

const functionRules = {
  required,
  number,
  string,
  boolean,
  date,
  array,
  file,
  accepted,
  max,
  min,
  gt,
  lt,
  gte: min,
  lte: max,
  size,
  between,
  regexp,
  confirm,
  after,
  before,
  image,
  mime,
  dimensions,
  includes,
  notIncludes,
  exists,
  unique,
};


export default class Validator {
  static make(data, rules, customMessages = {}) {
    const errors = new Map();
    Object.entries(rules).forEach(([attribute, attributeRules]) => {
      attributeRules = attributeRules.split("|");
      attributeRules.forEach((element) => {
        // eslint-disable-next-line prefer-const
        let [rule, values = ""] = element.split(":");
        values = values.split(",");
        const validate = functionRules[rule];
        const validation = validate(
          data[attribute],
          ...values,
          attribute,
          data
        );
        if (!validation) {
          errors.set(attribute, customMessages[rule]
            ? customMessages[rule]
            : this.getMessages(rule, attribute, values));
        }
      });
    });
    return errors;
  }

  static getMessages(rule, attribute, values) {
    let message = lines.errors[rule].replaceAll(
      ":attribute",
      attribute.replaceAll(/-|_/g, " ")
    );
    values.forEach((value) => {
      message = message.replace(":value", value);
    });
    return message;
  }
}