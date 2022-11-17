/* globaldata */
var $photoURL = document.querySelector('#photo');
var $photoSrc = document.querySelector('#image');
var $ul = document.querySelector('#entries-ul');
var $entriesLink = document.querySelector('#entries-link');
var $views = document.querySelectorAll('[data-view]');
var $formLink = document.getElementById('formLink');

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
  div5.appendChild($editIcon);

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
});

$ul.addEventListener('click', function (event) {
  if (event.target.matches('i')) {
    viewSwap('entry-form');
  }
});
