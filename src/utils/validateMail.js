export function validataEmail(mail) {
  var re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  if (!re.exec(mail)) {
    return false;
  } else {
    return true;
  }
}
