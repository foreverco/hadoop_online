// 验证手机号
export function validatePhone(value) {
  let reg = /^1[3456789]\d{9}$/;
  return !reg.test(value) ? true : false;
}
// 验证手机号
// export function validateEmail(value) {
//   let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
//   return !reg.test(value) ? true : false;
// }
