/* globaldata */
var $photoURL = document.querySelector('#photo');
var $photoSrc = document.querySelector('#image');
var $ul = document.querySelector('#entries-ul');
var $entriesLink = document.querySelector('#entries-link');
var $views = document.querySelectorAll('[data-view]');
var $formLink = document.getElementById('formLink');
var $formtitle = document.getElementById('entryTitle');
var $deleteEntrySpan = document.querySelector('.delete-entry-span');
var $cancelButton = document.querySelector('.cancel');
var $confirmModalOverlay = document.querySelector('.overlay');
var $deleteButton = document.querySelector('.confirm');

$photoURL.addEventListener('input', getPhoto);
function getPhoto(event) {
  var $photoValue = event.target.value;
  $photoSrc.setAttribute('src', $photoValue);
}

var $form = document.querySelector('#form');
$form.addEventListener('submit', entrySubmit);

function entrySubmit(event) {
  event.preventDefault();
  var object = {};
  object.title = $form.elements.title.value;
  object.url = $form.elements.url.value;
  object.notes = $form.elements.text.value;
  if (data.editing === null) {
    object.entryId = data.nextEntryId++;
    data.entries.unshift(object);
    $ul.prepend(renderEntry(object));
  } else {
    object.entryId = data.editing.entryId;
    updateEntries(object);
    var updatedLi = renderEntry(object);
    var liToReplace = findLi(data.editing.entryId);
    liToReplace.replaceWith(updatedLi);
    data.editing = null;
  }
  $form.reset();
  viewSwap('entries');
}

function renderEntry(entry) {
  var li = document.createElement('li');
  li.setAttribute('class', 'column-full entries');
  li.setAttribute('data-entry-id', entry.entryId);

  var div1 = document.createElement('div');
  div1.setAttribute('class', 'row');
  li.appendChild(div1);

  var div2 = document.createElement('div');
  div2.setAttribute('class', 'column-half');
  div1.appendChild(div2);

  var img = document.createElement('img');
  img.setAttribute('class', 'images');
  img.setAttribute('src', entry.url);
  div2.appendChild(img);

  var div3 = document.createElement('div');
  div3.setAttribute('class', 'column-half');
  div1.appendChild(div3);

  var div4 = document.createElement('div');
  div4.setAttribute('class', 'row');
  div3.appendChild(div4);

  var div5 = document.createElement('div');
  div5.setAttribute('class', 'column-full d-flex justify-between');
  div4.appendChild(div5);

  var $title = document.createElement('h2');
  $title.textContent = entry.title;

  var $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  div3.appendChild($notes);

  var $icon = document.createElement('i');
  $icon.className = 'fa-solid fa-pencil';
  div5.appendChild($title);
  div5.appendChild($icon);

  return li;

}

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
});

function viewSwap(view) {
  data.view = view;
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }

}
$entriesLink.addEventListener('click', function (event) {
  viewSwap('entries');
});

$formLink.addEventListener('click', function (event) {
  $form.reset();
  viewSwap('entry-form');
  $deleteEntrySpan.className = 'delete-entry-span hidden';
  updateFormTitle('New Entry');
});

// -------------------------Update entries------------------------

$ul.addEventListener('click', function (event) {
  if (event.target.matches('i')) {
    viewSwap('entry-form');
    var entryId = Number(event.target.closest('li').getAttribute('data-entry-id'));
    data.editing = findEntryObject(entryId);
    fillInForm(data.editing);
    $deleteEntrySpan.className = 'delete-entry-span';
    updateFormTitle('Edit Entry');
  }
});

function findEntryObject(entryId) {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === entryId) {
      return data.entries[i];
    }
  }
}

function fillInForm(entry) {
  $form.elements.title.value = entry.title;
  $form.elements.text.value = entry.notes;
  $form.elements.url.value = entry.url;
  $photoSrc.setAttribute('src', entry.url);
}

function updateEntries(object) {
  var newEntries = data.entries.map(entry => {
    if (entry.entryId === object.entryId) {
      return object;
    } else {
      return entry;
    }
  });
  data.entries = newEntries;
}

function findLi(entryId) {
  const $lis = document.querySelectorAll('li');
  for (const li of $lis) {
    if (Number(li.getAttribute('data-entry-id')) === entryId) {
      return li;
    }
  }
}

function updateFormTitle(string) {
  $formtitle.textContent = string;
}

// --------------------- Delete Modal Toggle ---------------------

function toggleConfirmationModal(event) {
  $confirmModalOverlay.className = 'overlay';
}

function hideModalHandler(event) {
  $confirmModalOverlay.className = 'overlay hidden';
}

$deleteEntrySpan.addEventListener('click', toggleConfirmationModal);
$cancelButton.addEventListener('click', hideModalHandler);

// -----------------------Delete Entry--------------------------

function deleteEntryHandler(event) {
  viewSwap('entries');
}

$deleteButton.addEventListener('click', deleteEntryHandler);
