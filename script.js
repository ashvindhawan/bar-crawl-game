const passwords = {
    pregame: 'ashvin',
    bar1: 'is',
    bar2: 'very',
    bar3: 'beautiful',
  };
  
  const triviaAnswers = {
    pregame: ['pink', 'sigma kappa', 'taco bell', 'violin'],
    bar1: ['san francisco', 'sushi', 'legislative aide', '1'],
    bar2: ['basketball', 'pancake', 'two', 'carissa'],
    bar3: ['cholula', 'mini cooper', 'dans.dispos', 'extraAnswer'],
  };
  
  const clues = {
    pregame: 'Clue for Bar 1',
    bar1: 'Clue for Bar 2',
    bar2: 'Clue for Bar 3',
    bar3: 'Final clue to Bar 4',
  };
  
  document.getElementById('password-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const password = document.getElementById('password').value.trim().toLowerCase();
    const barKey = document.body.getAttribute('data-bar-key'); // Use the data attribute   
    console.log(barKey);
    console.log(passwords[barKey]);
    console.log(password);
    if (password === passwords[barKey]) {
      document.getElementById('password-form').classList.add('hidden');
      document.getElementById('trivia-section').classList.remove('hidden');
    } else {
      alert('Incorrect password. Please try again.');
    }
  });
  
  document.getElementById('trivia-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const barKey = document.body.getAttribute('data-bar-key');
    const userAnswers = [
      document.getElementById('q1').value.trim().toLowerCase(),
      document.getElementById('q2').value.trim().toLowerCase(),
      document.getElementById('q3').value.trim().toLowerCase(),
      document.getElementById('q4').value.trim().toLowerCase(), // Added fourth answer
    ];
  
    const correctAnswers = triviaAnswers[barKey];
    console.log("Correct answers:", correctAnswers)

    var correctCount = userAnswers.filter((ans, i) => isCloseMatch(ans, correctAnswers[i])).length;

    // If barKey is bar3, always count the last answer as correct
    if (barKey === 'bar3') {
      correctCount += 1; // Count the last answer as correct
    }

    console.log("# of Correct answers:", correctCount)

    //if (userAnswers.every((ans, i) => isCloseMatch(ans, correctAnswers[i]))) {
    if (correctCount>=3) {
      document.getElementById('trivia-form').classList.add('hidden');
      document.getElementById('clue').textContent = clues[barKey];
      document.getElementById('clue-section').classList.remove('hidden');
    } else {
      alert('Sorry! You failed to answer my riddles. Please try again.');
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const partyText = document.querySelector('.party-text');
    
    // Create additional sparkle elements
    for (let i = 1; i <= 3; i++) {
        const sparkle = document.createElement('span');
        sparkle.textContent = '✨';
        sparkle.className = `sparkle-${i}`;
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        partyText.appendChild(sparkle);
    }
});
  
  function isCloseMatch(input, correct) {
    return (
      input === correct ||
      levenshteinDistance(input, correct) <= 2
    );
  }
  
  function levenshteinDistance(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );
  
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
  
    return matrix[a.length][b.length];
  }
  
  function navigateTo(page) {
    window.location.href = page;
  }
  