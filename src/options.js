const ensureSemiColons = (word) => {
  let result = word;

  if (!word.startsWith(':')) {
    result = ':' + result;
  }

  if (!word.endsWith(':')) {
    result = result + ':';
  }

  return result;
};

const overrides = [
  { name: 'absentEmoji', id: 'absent-emoji' },
  { name: 'presentEmoji', id: 'present-emoji' },
  { name: 'correctEmoji', id: 'correct-emoji' },
  { name: 'celebration1', id: 'celebration-1' },
  { name: 'celebration2', id: 'celebration-2' },
  { name: 'celebration3', id: 'celebration-3' },
  { name: 'celebration4', id: 'celebration-4' },
  { name: 'celebration5', id: 'celebration-5' },
  { name: 'celebration6', id: 'celebration-6' },
];

const saveOptions = () => {
  const toSet = {};
  const toRemove = [];

  overrides.forEach(({ name, id }) => {
    const value = document.getElementById(id).value;

    if (value) {
      toSet[name] = ensureSemiColons(value);
    } else {
      toRemove.push(name);
    }
  });

  chrome.storage.sync.set(toSet);
  chrome.storage.sync.remove(toRemove);
};

const restoreOptions = () => {
  const defaults = overrides.reduce((accumulator, { name }) => {
    accumulator[name] = null;
    return accumulator;
  }, {});

  chrome.storage.sync.get(defaults, (options) => {
    overrides.forEach(({ name, id }) => {
      const value = options[name];

      if (value !== null) {
        document.getElementById(id).value = value;
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
