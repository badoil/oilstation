function goToPage(idx, frm) {
  console.log(idx);
  let form = document.getElementById(frm);
  form.children.page.value = idx;
  form.submit();
}
