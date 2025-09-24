function getValueByPath(obj, path) {
  return path.split('.').reduce((acc, part) => {
    // Handle array index like exercises[0]
    const match = part.match(/(\w+)\[(\d+)\]/);
    if (match) {
      const [, key, index] = match;
      return acc[key][parseInt(index)];
    }
    return acc ? acc[part] : undefined;
  }, obj);
}

function mapDataToConfig(data, configSections) {
  return configSections.map(section => {
    const mappedFields = {};
    for (const field in section.fields) {
      mappedFields[field] = getValueByPath(data, section.fields[field]);
    }
    return { title: section.title, fields: mappedFields };
  });
}

module.exports = { getValueByPath, mapDataToConfig };
