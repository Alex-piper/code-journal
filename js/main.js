/* globaldata */
var $photoURL = document.querySelector('#photo');
var $photoSrc = document.querySelector('#image');
var $ul = document.querySelector('#entries-ul');
var $entriesLink = document.querySelector('#entries-link');
var $views = document.querySelectorAll('[data-view]');
var $formLink = document.getElementById('formLink');
var $form = document.querySelector('#form');
var $notes = document.querySelector('#notes');
var $title = document.querySelector('#Title');

$photoURL.addEventListener('input', getPhoto);
function getPhoto(event) {
  var $photoValue = event.target.value;
  $photoSrc.setAttribute('src', $photoValue);
}

$form.addEventListener('submit', entrySubmit);
function entrySubmit(event) {
  event.preventDefault();
  var object = {};
  object.title = $form.elements.title.value;
  object.url = $form.elements.url.value;
  object.notes = $form.elements.text.value;
  object.nextid = data.nextEntryId++;
  data.entries.unshift(object);
  $form.reset();
  $photoSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
  viewSwap('entries');
  $ul.prepend(renderEntry(object));
}

function renderEntry(entry) {
  var li = document.createElement('li');
  li.setAttribute('class', 'column-full entries');
  li.setAttribute('data-entry-id', entry.nextid);

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
  div5.setAttribute('class', 'column-full');
  div4.appendChild(div5);

  var $title = document.createElement('h2');
  $title.textContent = entry.title;
  div5.appendChild($title);

  var $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  div3.appendChild($notes);

  var $editIcon = document.createElement('i');
  $editIcon.className = 'fa-solid fa-pencil';
  $editIcon.setAttribute('data-view', 'entries');
  $editIcon.addEventListener('click', getViewName);
  div5.appendChild($editIcon);

  return li;

}

function getViewName(event) {
  var viewName = event.currentTarget.getAttribute('data-view');
  viewSwap(viewName);
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
  viewSwap('entry-form');
});

$ul.addEventListener('click', editHandler);

var targetJournalEntry = null;

function editHandler(event) {
  if (!event.target.matches('i')) {
    return null;
  } else {
    viewSwap('entry-form');
    targetJournalEntry = event.target.closest('li');
    var targetEntryid = targetJournalEntry.getAttribute('title');
    for (var i = 0; i < data.entries.length; i++) {
      var eachDataEntry = data.entries[i];
      if (Number(targetEntryId) === eachDataEntry.id) {
        $photoSrc.setAttribute('src', eachDataEntry.image);
        $title.value = eachDataEntry.title;
        $notes.value = eachDataEntry.notes;
        $photoURL.value = eachDataEntry.url;

        data.editing = eachDataEntry;
      }
    }
  }
}
// data.editing = entryObject(entryid);
// // autoPopulateForm(data.editing);

// function entryObject(entryId) {
//   for (let i = 0; i < data.entries.length; i++) {
//     if (data.entries[i].entryId === entryId) {
//       return data.entries[i];
//     }
//   }
// }

// function autoPopulateForm(entry) {
//   $title.value = data.title;
//   $notes.value = data.notes;
//   $photoURL.value = data.url;
//   $photoSrc.setAttribute('src', data.url);
// }
