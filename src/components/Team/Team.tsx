import './Team.css';
import { IoHomeOutline } from "react-icons/io5";

type PropsType = {
    Them: 'blue' | 'gray';

    handleOnClose: () => void;
    handleOnChangeTeam: (value: 'blue' | 'gray') => void;
};

const Team: React.FC<PropsType> = props => {
    const { Them } = props;
    const { handleOnClose, handleOnChangeTeam } = props;

    const onCloseWindow = () => {
        handleOnClose();
    }

    const onChangeTeam = (value: any) => {
        const Value: 'blue' | 'gray' = value.target.value;
        handleOnChangeTeam(Value);
    }

    return (
        <div className={'team'}>
            <div className='team__divButton'>
                <IoHomeOutline className='team__divButton__button' onClick={onCloseWindow}/>
            </div>
            <div className='team__divText'>
                Выбор темы:
            </div>
            <div className='team__divSelect'>
                <select className='team__divSelect__select' value={Them} onChange={onChangeTeam}>
                    <option value={'blue'}>Изумрудная</option>
                    <option value={'gray'}>Серая</option>
                </select>
            </div>
        </div>
    );
};

export default Team;
