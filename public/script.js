document.addEventListener('DOMContentLoaded', () => {
  const scheduleElement = document.getElementById('schedule');
  const searchInput = document.getElementById('searchInput');
  let allTalks = [];

  // Config
  const START_TIME = 10 * 60; // 10:00 AM in minutes
  const TALK_DURATION = 60;
  const TRANSITION = 10;
  const LUNCH_DURATION = 60;

  async function fetchTalks() {
    try {
      const response = await fetch('/api/talks');
      allTalks = await response.json();
      renderSchedule(allTalks);
    } catch (error) {
      console.error('Error fetching talks:', error);
      scheduleElement.innerHTML = '<p>Error loading schedule. Please try again later.</p>';
    }
  }

  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  }

  function renderSchedule(talksToDisplay) {
    scheduleElement.innerHTML = '';
    let currentTime = START_TIME;

    // We have 6 talks. Let's map them to the schedule.
    // The filter might reduce the number of talks shown, 
    // but the time slots remain fixed to the original schedule structure for clarity.
    
    const scheduleItems = [];
    
    // Original full schedule layout logic
    let talkIndex = 0;
    for (let i = 0; i < 6; i++) {
      const talk = allTalks[i];
      
      // Add Talk
      const startTimeStr = formatTime(currentTime);
      const endTimeStr = formatTime(currentTime + TALK_DURATION);
      
      // Check if this talk matches search filter
      const matchesSearch = talksToDisplay.some(t => t.id === talk.id);

      if (matchesSearch) {
        scheduleItems.push({
          type: 'talk',
          time: `${startTimeStr} - ${endTimeStr}`,
          ...talk
        });
      }

      currentTime += TALK_DURATION;

      // Add Lunch after Talk 3
      if (i === 2) {
        scheduleItems.push({
          type: 'break',
          title: '🍱 Lunch Break',
          time: `${formatTime(currentTime)} - ${formatTime(currentTime + LUNCH_DURATION)}`,
          description: 'Enjoy a delicious lunch and network with fellow attendees.'
        });
        currentTime += LUNCH_DURATION;
      }

      // Add Transition/Short Break if not the last talk
      if (i < 5) {
        currentTime += TRANSITION;
      }
    }

    if (scheduleItems.length === 0) {
      scheduleElement.innerHTML = '<p>No talks found for this category.</p>';
      return;
    }

    scheduleItems.forEach(item => {
      const card = document.createElement('div');
      card.className = item.type === 'talk' ? 'talk-card' : 'break-card';

      if (item.type === 'talk') {
        card.innerHTML = `
          <span class="time">${item.time}</span>
          <h3>${item.title}</h3>
          <p class="speakers">Speakers: ${item.speakers.join(', ')}</p>
          <div class="categories">
            ${item.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
          </div>
          <p class="description">${item.description}</p>
        `;
      } else {
        card.innerHTML = `
          <span class="time">${item.time}</span>
          <h3>${item.title}</h3>
          <p class="description">${item.description}</p>
        `;
      }
      scheduleElement.appendChild(card);
    });
  }

  // Search filter
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTalks = allTalks.filter(talk => 
      talk.categories.some(cat => cat.toLowerCase().includes(searchTerm)) ||
      talk.title.toLowerCase().includes(searchTerm)
    );
    renderSchedule(filteredTalks);
  });

  fetchTalks();
});
