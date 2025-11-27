import type {GetItemsType} from '../../Types';
import { IoHomeOutline } from "react-icons/io5";
import './Modal.css';

type PropsType = {
    SelectedItems: GetItemsType | undefined;

    handleOnClose: () => void;
};

const Modal: React.FC<PropsType> = props => {
    const { SelectedItems } = props;
    const { handleOnClose } = props;

    const onClose = () => {
        handleOnClose();
    }

    return (
        <div className={'modal'}>
            <div className='modal__divButton'>
                <IoHomeOutline className='modal__divButton__button' onClick={onClose}/>
            </div>
            {SelectedItems ? (
            <>
                <div className='modal__foto'><img className='modal__foto__img' src={SelectedItems.fotoUrl} alt={SelectedItems.title} /></div>
                <div className='modal__price'>{`Цена: ${SelectedItems.price}THB ${SelectedItems.weight}pcs`}</div>
                <div className='modal__text'>{SelectedItems.text}</div>
            </>
            ) : null}
        </div>
    );
};

export default Modal;
