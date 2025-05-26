const expressServer = 'http://localhost:3000';

$('#lvlada').on('click', function() {
    fetch( expressServer + '/api/caseSelect/louisvuitton').then((response) => response.json())
    setTimeout(() => {
        window.location.href = expressServer + '/porgetes';
    }, 1000);
  
});


$('#diorlada').on('click', function() {
    fetch( expressServer + '/api/caseSelect/dior').then((response) => response.json())
    setTimeout(() => {
        window.location.href = expressServer + '/porgetes';
    }, 1000);
  
});


$('#mercilada').on('click', function() {
    fetch( expressServer + '/api/caseSelect/mercedes').then((response) => response.json())
    setTimeout(() => {
        window.location.href = expressServer + '/porgetes';
    }, 1000);
  
});


$('#snkrlada').on('click', function() {
    fetch( expressServer + '/api/caseSelect/sneaker').then((response) => response.json())
    setTimeout(() => {
        window.location.href = expressServer + '/porgetes';
    }, 1000);
  
});


$('#oralada').on('click', function() {
    fetch( expressServer + '/api/caseSelect/ora').then((response) => response.json())
    setTimeout(() => {
        window.location.href = expressServer + '/porgetes';
    }, 1000);
  
});

$('#ruhalada').on('click', function() {
    fetch( expressServer + '/api/caseSelect/ruha').then((response) => response.json())
    setTimeout(() => {
        window.location.href = expressServer + '/porgetes';
    }, 1000);
  
});

$('#mixlada').on('click', function() {
    fetch( expressServer + '/api/caseSelect/mix').then((response) => response.json())
    setTimeout(() => {
        window.location.href = expressServer + '/porgetes';
    }, 1000);
  
});

$('#applelada').on('click', function() {
    fetch( expressServer + '/api/caseSelect/gamer').then((response) => response.json())
    setTimeout(() => {
        window.location.href = expressServer + '/porgetes';
    }, 1000);
  
});

$('#1lada').on('click', function() {
    fetch( expressServer + '/api/caseSelect/egyszazalek').then((response) => response.json())
    setTimeout(() => {
        window.location.href = expressServer + '/porgetes';
    }, 1000);
  
});

$('#gamerlada').on('click', function() {
    fetch( expressServer + '/api/caseSelect/gamer').then((response) => response.json())
    setTimeout(() => {
        window.location.href = expressServer + '/porgetes';
    }, 1000);
  
});