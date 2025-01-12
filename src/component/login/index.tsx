import React from 'react'
import { loginStyle } from '../../style/login'

function Login() {
  const classes = loginStyle()
  const [userId, setUserId] = React.useState<string>('')
  const [passwd, setPasswd] = React.useState<string>('')
  const loginCheck = localStorage.getItem('userId')

  const submitLogin = async () => {
    const payload = {
      userId: userId,
      passwd: passwd,
    }

    const response = await fetch(`http://localhost:4000/api/login`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const { code, personalColor } = await response.json()

    if (code === 200) {
      localStorage.setItem('userId', userId)
      localStorage.setItem('personalColor', personalColor)
      window.location.href = '/'
    }
  }

  if (loginCheck !== null) {
    window.location.href = '/'
  }

  return (
    <React.Fragment>
      <div className={classes.login}>
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <div className={classes.title}>Welcome PersonalColor!</div>
            <div className={classes.input}>
              <input type="text" placeholder="id" onChange={(e: any) => setUserId(e.target.value)} />
            </div>
            <div className={classes.input}>
              <input
                type="password"
                placeholder="password"
                onChange={(e: any) => setPasswd(e.target.value)}
                onKeyPress={(e: any) => {
                  if (e.key === 'Enter') {
                    submitLogin()
                  }
                }}
              />
            </div>
            <div className={classes.button}>
              <button
                onClick={() => {
                  if (userId === '') return
                  if (passwd === '') return
                  submitLogin()
                }}
              >
                Login
              </button>
            </div>
            <div className={classes.a}>
              <a style={{ textDecoration: 'none', color: '#ffffff' }} href="/">
                아이디나 패스워드를 잊으셨나요?
              </a>
            </div>
            <div className={classes.a}>
              <a style={{ textDecoration: 'none', color: '#ffffff' }} href="/signup">
                아이디가 없으신가요?
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login
