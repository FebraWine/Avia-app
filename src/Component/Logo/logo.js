import classes from '../../SCSS/logo.module.scss'

const LogoImg = require('../../assets/img/mainLogo.PNG')

export default function Logo() {
  return (
    <div className={classes.logo}>
      <img className={classes.img} alt="Logo avia" src={LogoImg} />
    </div>
  )
}
