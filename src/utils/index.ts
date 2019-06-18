/**
 isNone();              // true
 isNone(null);          // true
 isNone(undefined);     // true
 isNone('');            // false
 isNone([]);            // false
 isNone(function() {}); // false
 */
function isNone(object) {
  return object === null || object === undefined;
}

/**
 isEmpty();                 // true
 isEmpty(null);             // true
 isEmpty(undefined);        // true
 isEmpty('');               // true
 isEmpty([]);               // true
 isEmpty({ size: 0});       // true
 isEmpty({});               // false
 isEmpty('Adam Hawkins');   // false
 isEmpty([0,1,2]);          // false
 isEmpty('\n\t');           // false
 isEmpty('  ');             // false
 isEmpty({ size: 1 })       // false
 isEmpty({ size: () => 0 }) // false
 */
function isEmpty(object) {
  if (isNone(object)) {
    return true;
  }

  if (typeof object.size === 'number') {
    return !object.size;
  }

  const objectType = typeof object;

  if (objectType === 'object') {
    const size = object.size;
    if (typeof size === 'number') {
      return !size;
    }
  }

  if (typeof object.length === 'number' && objectType !== 'function') {
    return !object.length;
  }

  if (objectType === 'object') {
    const length = object.length;
    if (typeof length === 'number') {
      return !length;
    }
  }

  return false;
}

/**
 isBlank();                // true
 isBlank(null);            // true
 isBlank(undefined);       // true
 isBlank('');              // true
 isBlank([]);              // true
 isBlank('\n\t');          // true
 isBlank('  ');            // true
 isBlank({});              // false
 isBlank('\n\t Hello');    // false
 isBlank('Hello world');   // false
 isBlank([1,2,3]);         // false
 */
function isBlank(obj) {
  return isEmpty(obj) || (typeof obj === 'string' && obj.match(/\S/) === null);
}

export {
  isNone,
  isEmpty,
  isBlank
}