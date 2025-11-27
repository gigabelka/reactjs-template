import {useEffect, useState} from 'react';
import type {ContactsType} from '../../Types';
import { IoHomeOutline } from "react-icons/io5";
import './Form.css';

type PropsType = {
    Tele: any;
    TotalPrice: number;
    OrderNow: boolean;

    handleSetContacts: (val: ContactsType) => void;
    onBackToShop: () => void;
};

const Form: React.FC<PropsType> = props => {
    const { Tele, TotalPrice, OrderNow } = props;
    const { handleSetContacts, onBackToShop } = props;

    const [subject, setSubject] = useState<'pickup' | 'delivery'>('pickup');
    const [adddr1, setAdddr1] = useState<string | undefined>(undefined);
    const [adddr2, setAdddr2] = useState<string | undefined>(undefined);
    const [adddr3, setAdddr3] = useState<string | undefined>(undefined);
    const [telNo, setTelNo] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);
    const [comment, setComment] = useState<string>('');

    useEffect(() => {
        Tele.MainButton.setParams({
            text: 'Заказать'
        });
    }, [Tele]);

    useEffect(() => {
        if (subject === 'pickup') {
            handleSetContacts({
                subject: 'pickup',
                adddres: '',
                name: name ? name : '',
                telNo: telNo ? telNo : '',
                comment: comment,
            });
        } else {
            handleSetContacts({
                subject: 'delivery',
                adddres: `${adddr1}, ${adddr2}, ${adddr3}`,
                name: name ? name : '',
                telNo: telNo ? telNo : '',
                comment: comment,
            });
        }

        if (subject === 'pickup') {
            if (!telNo || !name || !OrderNow) {
                Tele.MainButton.hide();
            } else {
                Tele.MainButton.show();
            }
        } else {
            if(!adddr1 || !adddr2 || !adddr3 || !telNo || !name || !OrderNow) {
                Tele.MainButton.hide();
            } else {
                Tele.MainButton.show();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subject, adddr1, adddr2, adddr3, telNo, comment, OrderNow]);

    const onChangeSubject = (e: any) => {
        setSubject(e.target.value);
    }

    const onChangeAddr1 = (e: any) => {
        setAdddr1(e.target.value);
    };

    const onChangeAddr2 = (e: any) => {
        setAdddr2(e.target.value);
    };

    const onChangeAddr3 = (e: any) => {
        setAdddr3(e.target.value);
    };

    const onChangeTel = (e: any) => {
        setTelNo(String(e.target.value));
    };

    const onChangeName = (e: any) => {
        setName(e.target.value);
    };

    const onChangeComment = (e: any) => {
        setComment(e.target.value);
    };

    return (<>
        <div className='form__divButton'>
            <IoHomeOutline className='form__divButton__button' onClick={onBackToShop}/>
        </div>
        <div className="form">
            <h2 className="cart__container">{`${Math.round(TotalPrice)} THB`}</h2>
            <input
                className='form__input'
                type="text"
                maxLength={40}
                placeholder='имя'
                value={name}
                onChange={onChangeName}
                key={'input4'}
            />
            <input
                className='form__input'
                type="number"
                maxLength={12}
                placeholder='№ телефона без знака +'
                value={telNo}
                onChange={onChangeTel}
                key={'input5'}
            />
            <input
                className='form__input'
                type="text"
                maxLength={100}
                placeholder='комментарий к заказу'
                value={comment}
                onChange={onChangeComment}
                key={'input6'}
            />
            <select value={subject} onChange={onChangeSubject} className={'form__select'}>
                <option value={'pickup'}>Самовывоз</option>
                <option value={'delivery'}>Доставка</option>
            </select>
            {subject === 'delivery' ? 
                (<>            
                    <input
                        className='form__input'
                        type="text"
                        maxLength={40}
                        placeholder='улица, № дома'
                        value={adddr1}
                        onChange={onChangeAddr1}
                        key={'input1'}
                    />
                    <input
                        className='form__input'
                        type="text"
                        maxLength={40}
                        placeholder='микрорайон'
                        value={adddr2}
                        onChange={onChangeAddr2}
                        key={'input2'}
                    />
                    <input
                        className='form__input'
                        type="text"
                        maxLength={40}
                        placeholder='район, город, индекс'
                        value={adddr3}
                        onChange={onChangeAddr3}
                        key={'input3'}
                    />
                    <input
                        className='form__input'
                        type="text"
                        maxLength={100}
                        placeholder='комментарий к заказу'
                        value={comment}
                        onChange={onChangeComment}
                        key={'input4'}
                    />
                    <span className='form__text'>
                        Доставка оплачивается отдельно, по договорённости.
                    </span>
                </>) 
            : (
                <>
                    <span></span><br/>
                    <span>94/1 Soi Cherngtalay 14</span><br/>
                    <span>Tambon Choeng Thale</span><br/>
                    <span>Thalang District, Phuket 83110</span><br/>
                    <span>tel: +66 655356330</span><br/>
                </>
            )}
        </div>
    </>
    );
};

export default Form;
