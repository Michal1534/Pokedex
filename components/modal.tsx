

export const Modal: React.FC<{
    show: boolean,
    onClose: VoidFunction
}> = ({show, children, onClose}) =>{
    return( <div className={`modal ${show ? 'active' : ''}`} onClick={onClose}>
        <div className={'modalContent'}>
             {children}
    </div>
    </div>)
};

export const ModalBody = (props: any) =>{
    return <div className='modal_body'>
        {props.children}
    </div>
}