import style from './Modal.module.css'

export default function Modal({active, setActive, children}) {
    return (
        <div className={active ? style.bgActive : style.background} onClick={() => setActive(false)}>
            <div className={active ? style.mActive : style.modal} onClick={(e) => e.stopPropagation()}>
                <div className={style.children}>
                    {children}
                </div>
            </div>
        </div>
    )
}