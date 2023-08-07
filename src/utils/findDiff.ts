type NestedObject = { [key: string]: any }

export function findDiff(obj1: NestedObject, obj2: NestedObject): NestedObject {
  const diff: NestedObject = {}

  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])

  for (const key of keys) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      const nestedDiff = findDiff(obj1[key], obj2[key])
      if (Object.keys(nestedDiff).length > 0) {
        diff[key] = nestedDiff
      }
    } else if (obj1[key] !== obj2[key]) {
      diff[key] = obj2[key]
    }
  }

  return diff
}
