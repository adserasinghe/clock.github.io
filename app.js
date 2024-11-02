function updateFlipClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    updateFlipUnit('hours', hours);
    updateFlipUnit('minutes', minutes);
    updateFlipUnit('seconds', seconds);
  }
  
  function updateFlipUnit(unit, value) {
    const flipUnit = document.querySelector(`.${unit}`);
    const currentValue = flipUnit.querySelector('.top').textContent;
    
    if (currentValue !== value) {
      flipUnit.querySelector('.top').textContent = value;
      flipUnit.querySelector('.bottom').textContent = value;
      flipUnit.querySelector('.top').classList.add('flip');
      
      setTimeout(() => {
        flipUnit.querySelector('.top').classList.remove('flip');
      }, 600);
    }
  }
  
  // World Clock
  function updateWorldClock() {
    const timeZones = document.querySelectorAll('.time');
    timeZones.forEach(zone => {
      const time = new Date().toLocaleTimeString('en-US', {
        timeZone: zone.dataset.timezone,
        hour: '2-digit',
        minute: '2-digit'
      });
      zone.textContent = time;
    });
  }
  
  // Calendar
  let currentDate = new Date();
  
  function renderCalendar() {
    const calendar = document.querySelector('.calendar');
    const monthYear = document.getElementById('current-month');
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    monthYear.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    calendar.innerHTML = '';
  
    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
      const dayHeader = document.createElement('div');
      dayHeader.textContent = day;
      dayHeader.classList.add('calendar-day');
      calendar.appendChild(dayHeader);
    });
  
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      const emptyDay = document.createElement('div');
      calendar.appendChild(emptyDay);
    }
  
    // Add days of month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dayElement = document.createElement('div');
      dayElement.textContent = day;
      dayElement.classList.add('calendar-day');
      
      if (day === new Date().getDate() && 
          currentDate.getMonth() === new Date().getMonth() && 
          currentDate.getFullYear() === new Date().getFullYear()) {
        dayElement.classList.add('current-day');
      }
      
      calendar.appendChild(dayElement);
    }
  }
  
  function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  }
  
  function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  }
  
  // Weather (using dummy data - replace with actual API calls)
  function updateWeather() {
    // Simulate weather data
    document.getElementById('temperature').textContent = '24°C';
    document.getElementById('location').textContent = 'Colombo, Sri Lanka';
    document.getElementById('humidity').textContent = '65%';
    document.getElementById('wind').textContent = '12 km/h';
  }
  
  // Initialize and update everything
  function initialize() {
    updateFlipClock();
    updateWorldClock();
    renderCalendar();
    updateWeather();
    
    setInterval(updateFlipClock, 1000);
    setInterval(updateWorldClock, 1000);
  }
  
  // Start the clock when the page loads
  initialize();