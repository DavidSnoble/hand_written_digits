import style from './Frame.module.css';
import IProps from '@/types/Frame'

const Frame = ({ children, ...rest }: IProps) => (
    <div className={style.frame} {...rest} >
        {children}
    </div>
);

export default Frame;