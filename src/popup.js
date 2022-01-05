chrome.storage.sync.get(
  {
    absentEmoji: ':black-large-square:',
    presentEmoji: ':large-yellow-square:',
    correctEmoji: ':large-green-square:',
    celebration1: ':golf:',
    celebration2: ':eagle:',
    celebration3: ':rocket:',
    celebration4: ':sunglasses:',
    celebration5: ':triumph:',
    celebration6: ':omegalul:',
  },
  (overrides) => {
    const celebrations = [
      ':robot:',
      overrides.celebration1,
      overrides.celebration2,
      overrides.celebration3,
      overrides.celebration4,
      overrides.celebration5,
      overrides.celebration6,
    ];

    console.log(overrides);

    chrome.storage.local.get('gameState', ({ gameState }) => {
      let { evaluations } = JSON.parse(gameState);

      evaluations = evaluations.filter((x) => x !== null);

      let message = evaluations
        .filter((x) => x !== null)
        .map((guess) => {
          return guess
            .map((x) => {
              if (x === 'absent') {
                return overrides.absentEmoji;
              } else if (x === 'present') {
                return overrides.presentEmoji;
              } else if (x === 'correct') {
                return overrides.correctEmoji;
              } else {
                return ':question';
              }
            })
            .join('');
        })
        .join('\n');

      message +=
        '\n\nGot it in ' +
        evaluations.length +
        ' guesses! ' +
        celebrations[evaluations.length];

      navigator.clipboard.writeText(message);
    });
  }
);
