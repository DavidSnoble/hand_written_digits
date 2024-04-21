import style from './Button.module.css';
import IProps from '@/types/button'

const Button = ({ children, ...rest }: IProps) => (
    <button className={style.button} {...rest} >{children}</button>
)

export default Button;