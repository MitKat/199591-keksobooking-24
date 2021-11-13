const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const MAX_VALUE_PHOTO = 2;

const fileAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');

fileAvatar.addEventListener('change', () => {
  const file = fileAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

const filePhotoForm = document.querySelector('.ad-form__upload input[type=file]');
const preview = document.querySelector('.ad-form__photo');


filePhotoForm.addEventListener('change', () => {
  const file = filePhotoForm.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));


  if (matches) {
    const photoItem = document.createElement('img');
    photoItem.style.width = '70px';
    photoItem.style.height = '70px';
    photoItem.alt = 'photo of housing';
    photoItem.src = URL.createObjectURL(file);

    const photosPreview = preview.querySelectorAll('img');

    if (photosPreview.length > MAX_VALUE_PHOTO) {
      preview.innerHTML= ' ';
      preview.append(photoItem);
    }
    preview.append(photoItem);
  }

});
