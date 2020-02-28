export default ((config, language) => {
  if (typeof language !== 'string') {
    return null;
  }

  const subpath = config.localeSubpaths[language];

  if (typeof subpath !== 'string') {
    return null;
  }

  return subpath;
});