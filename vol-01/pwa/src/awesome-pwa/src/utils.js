export const removeItemFromList = () => {};

export const getBase64Image = file => {
  return new Promise(resolve => {
    var reader = new FileReader();
    reader.onload = function(e) {
      resolve(e.target.result);
    };
    reader.readAsDataURL(file);
  });
};

export const registerBackgroundSync = tag => {
  navigator.serviceWorker.ready
    .then(function(reg) {
      console.log("register background sync");
      return reg.sync.register(tag);
    })
    .catch(function() {
      console.log("cannot register background sync");
    });
};
