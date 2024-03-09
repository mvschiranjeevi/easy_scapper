// Exporting functions as module.exports
module.exports = {
  binarySearch: binarySearch,
  binaryInsert: binaryInsert,
  mergeSort: mergeSort,
};

// Function to perform binary search in a sorted array
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  // Loop until the search space is exhausted
  while (low <= high) {
    // Calculate the middle index
    const mid = low + ((high - low) >> 1);
    // If target is found, return its index
    if (target === arr[mid]) {
      return mid;
    } else if (target > arr[mid]) {
      // If target is greater, search in the right half
      low = mid + 1;
    } else {
      // If target is smaller, search in the left half
      high = mid - 1;
    }
  }
  // If target is not found, return null
  return null;
}

// Function to insert a value into a sorted array while maintaining the sorted order
function binaryInsert(arr, value) {
  // If the array is empty or value is less than or equal to the first element, insert at the beginning
  if (arr.length === 0 || value <= arr[0]) {
    arr.unshift(value);
    return arr;
  }
  // If value is greater than the last element, insert at the end
  if (value > arr[arr.length - 1]) {
    arr.push(value);
    return arr;
  }
  let low = 0;
  let high = arr.length - 1;
  // Perform binary search to find the insertion position
  while (low <= high) {
    const mid = low + ((high - low) >> 1);
    if (value === arr[mid]) {
      // If value is found, insert at its position
      arr.splice(mid, 0, value);
      return arr;
    } else if (value > arr[mid]) {
      // If value is greater, search in the right half
      low = mid + 1;
    } else {
      // If value is smaller, search in the left half
      high = mid - 1;
    }
  }
  // Insert value at the appropriate position
  arr.splice(value <= arr[low] ? low : low + 1, 0, value);
  return arr;
}

// Function to perform merge sort on an array
function mergeSort(arr) {
  // Base case: if the array has 0 or 1 element, it is already sorted
  if (arr.length <= 1) {
    return arr;
  }
  // Split the array into two halves
  const mid = arr.length >> 1;
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  // Recursively sort the left and right halves
  return merge(mergeSort(left), mergeSort(right));
}

// Function to merge two sorted arrays
function merge(left, right) {
  const result = [];
  let l = 0;
  let r = 0;
  // Merge the two arrays while maintaining sorted order
  while (l < left.length && r < right.length) {
    if (left[l] <= right[r]) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
  }
  // Concatenate the remaining elements from left and right arrays
  return result.concat(left.slice(l), right.slice(r));
}

// Function to check if two values or objects are equal
function isEqual(a, b) {
  const caseSensitive = false;
  // Handle different data types
  if (a === undefined || b === undefined) {
    return a === b;
  } else if (a === null || b === null) {
    return a === b;
  } else if (typeof a === "string" || typeof b === "string") {
    if (typeof a === "string" && typeof b === "string") {
      return caseSensitive ? a === b : a.toLowerCase() === b.toLowerCase();
    }
    return a === b;
  } else if (typeof a === "number" || typeof b === "number") {
    return a === b;
  } else if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  } else if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  } else if (
    a instanceof Object &&
    !Array.isArray(a) &&
    b instanceof Object &&
    !Array.isArray(b)
  ) {
    for (const key in a) {
      if (a.hasOwnProperty(key) && !isEqual(a[key], b[key])) {
        return false;
      }
    }
    for (const key in b) {
      if (b.hasOwnProperty(key) && !isEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  // Default case: compare values directly
  return a === b;
}
