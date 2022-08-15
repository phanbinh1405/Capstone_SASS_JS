let arrInput = document.querySelectorAll('#registerForm input:not([type=radio])');

for (let input of arrInput) {
  input.addEventListener('input', () => {
    if (input.value.length > 0) {
      input.nextElementSibling.classList.add('shrink');
    }
    validation(input);
  });
}

const validation = (data) => {
  let isValid = true;

  const { id, value } = data;
  if (id == 'email') {
    let regexEmail =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value.match(regexEmail)) {
      isValid = false;
      document.querySelector('#tbEmail').innerText = `Email không hợp lệ!`;
    } else {
      document.querySelector('#tbEmail').innerText = ``;
    }
  }

  if (id == 'password') {
    let regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;   
    if (!regexPassword.test(value)) {
      isValid = false;
      document.querySelector(
        '#tbPassword'
      ).innerText = `Mật khẩu phải có 8 ký tự, có ít nhất một chữ hoa, một số và một ký tự đặc biệt`;
    } else {
      document.querySelector('#tbPassword').innerText = ``;
    }
  }

  if (id == 'passwordConfirm') {
    if (value !== document.querySelector('#password').value) {
      isValid = false;
      document.querySelector('#tbPasswordConfirm').innerText = `Mật khẩu không trùng khớp!`;
    } else {
      document.querySelector('#tbPasswordConfirm').innerText = ``;
    }
  }
  if (id == 'name') {
    if (value.length <= 0) {
      isValid = false;
      document.querySelector('#tbName').innerText = `Tên không được để trống`;
    } else {
      document.querySelector('#tbName').innerText = ``;
    }
  }

  if (id == 'phone') {
    let regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!value.match(regexPhone)) {
      isValid = false;
      document.querySelector('#tbPhone').innerText = `Số điện thoại không đúng định dạng`;
    } else {
      document.querySelector('#tbPhone').innerText = ``;
    }
  }

  return isValid;
};

const handleSubmit = (e) => {
  e.preventDefault()
  let data = {
    email: '',
    password: '',
    name: '',
    gender: true,
    phone: '',
  };
  let genderInput = document.querySelectorAll('#registerForm input[name=gender]');
  let arrInputChange = document.querySelectorAll('#registerForm input:not([type=radio])');

  for (let input of genderInput) {
    if (input.checked) {
  //  input.value === 'true' ? data.gender = true : data.gender = false;
  data.gender = input.value
    }
  }

  for (let input of arrInputChange) {
    const { id, value } = input;
    console.log(value)
    let isValid = validation(input);
    if (isValid) {
      if (id !== 'passwordConfirm') {
        data[id] = value;
      }
    } else {
      return alert('Vui lòng điền đầy đủ thông tin đăng ký!');
    }
  }
  signup(data)
};

const signup = async(data) => {
  try {
    const res = await axios.post(`https://shop.cyberlearn.vn/api/Users/signup`, data);
    if(res) { 
      return alert(res.data.message)
    } 
  } catch (err) {
    return alert(err.response.data.message)
  }
};

document.querySelector('button[type=submit]').addEventListener('click', (e) => {
  handleSubmit(e)
})