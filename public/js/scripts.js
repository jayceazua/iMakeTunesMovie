let details = document.querySelectorAll('.moreDetails');

details.forEach((detail) => {
  detail.addEventListener('click', function(e) {
    console.log(e.target.id);
  });
});
