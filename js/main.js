/* globaldata */
var $photoURL = document.querySelector('#photo');
var $photoSrc = document.querySelector('#image');

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
  object.notes = $form.elements.notes.value;
  object.nextid = data.nextEntryId++;
  data.entries.unshift(object);
  $photoSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
