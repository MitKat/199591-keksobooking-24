const FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PATH_IMG_AVATAR_RESET = 'img/muffin-grey.svg';

const fileAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const filePhotoForm = document.querySelector('.ad-form__upload input[type=file]');
const photoContainer = document.querySelector('.ad-form__photo-container');
const previewPhotoForm = photoContainer.querySelector('.ad-form__photo');

//загрузка автара
fileAvatar.addEventListener('change', () => {
  const file = fileAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILES_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

//загрузка фотографий жилья
filePhotoForm.addEventListener('change', () => {
  const photoAddForm = previewPhotoForm.cloneNode(true);

  const file = filePhotoForm.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILES_TYPES.some((it) => fileName.endsWith(it));

  const photoItem = document.createElement('img');
  photoItem.style.width = '70px';
  photoItem.style.height = '70px';
  photoItem.style.borderRadius = '5px';
  photoItem.alt = 'photo of housing';
  if (matches) {
    photoItem.src = URL.createObjectURL(file);
  }
  photoAddForm.appendChild(photoItem);

  photoContainer.insertBefore(photoAddForm, previewPhotoForm);
});

const resetPhotosForm = () => {
  previewAvatar.src = PATH_IMG_AVATAR_RESET;
  const photosForm = photoContainer.querySelectorAll('.ad-form__photo');
  for (let i=0; i < photosForm.length-1; i++) {
    photoContainer.removeChild(photosForm[i]);
  }
};

export {resetPhotosForm};
