// Carregar dados salvos ao iniciar
window.onload = function() {
    loadLinks();
    loadIdeas();
    loadEvents();
};

// Banco de Links
function addLink() {
    const linkInput = document.getElementById('link-input').value;
    const tagInput = document.getElementById('tag-input').value || 'Sem tag';
    if (linkInput) {
        const linkList = document.getElementById('link-list');
        const li = document.createElement('li');
        const favicon = `https://www.google.com/s2/favicons?domain=${linkInput}`;
        li.innerHTML = `<img src="${favicon}" alt="favicon" style="width:16px; height:16px; margin-right:5px;"> 
                        <a href="${linkInput}" target="_blank">${linkInput}</a> [${tagInput}] 
                        <input type="text" placeholder="Comentário" onblur="saveLinks()">`;
        linkList.appendChild(li);
        saveLinks();
        document.getElementById('link-input').value = '';
        document.getElementById('tag-input').value = '';
    }
}

function saveLinks() {
    const linkList = document.getElementById('link-list').innerHTML;
    localStorage.setItem('links', linkList);
}

function loadLinks() {
    const savedLinks = localStorage.getItem('links');
    if (savedLinks) document.getElementById('link-list').innerHTML = savedLinks;
}

// Prompt de Ideias
function saveIdea() {
    const ideaInput = document.getElementById('idea-input').value;
    if (ideaInput) {
        const ideaList = document.getElementById('idea-list');
        const li = document.createElement('li');
        const timestamp = new Date().toLocaleString();
        li.textContent = `${ideaInput} (${timestamp})`;
        ideaList.appendChild(li);
        saveIdeas();
        document.getElementById('idea-input').value = '';
    }
}

function saveIdeas() {
    const ideaList = document.getElementById('idea-list').innerHTML;
    localStorage.setItem('ideas', ideaList);
}

function loadIdeas() {
    const savedIdeas = localStorage.getItem('ideas');
    if (savedIdeas) document.getElementById('idea-list').innerHTML = savedIdeas;
}

// Calendário
function addEvent() {
    const eventDate = document.getElementById('event-date').value;
    const eventInput = document.getElementById('event-input').value;
    if (eventDate && eventInput) {
        const eventList = document.getElementById('event-list');
        const li = document.createElement('li');
        li.textContent = `${eventDate}: ${eventInput}`;
        eventList.appendChild(li);
        saveEvents();
        document.getElementById('event-date').value = '';
        document.getElementById('event-input').value = '';
    }
}

function saveEvents() {
    const eventList = document.getElementById('event-list').innerHTML;
    localStorage.setItem('events', eventList);
}

function loadEvents() {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) document.getElementById('event-list').innerHTML = savedEvents;
}

// Exportar/Importar/Imprimir
function exportData() {
    const data = {
        links: localStorage.getItem('links'),
        ideas: localStorage.getItem('ideas'),
        events: localStorage.getItem('events')
    };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'banco-de-links.json';
    a.click();
}

function importData(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = JSON.parse(e.target.result);
        localStorage.setItem('links', data.links);
        localStorage.setItem('ideas', data.ideas);
        localStorage.setItem('events', data.events);
        loadLinks();
        loadIdeas();
        loadEvents();
    };
    reader.readAsText(file);
}

function printData() {
    window.print();
}
