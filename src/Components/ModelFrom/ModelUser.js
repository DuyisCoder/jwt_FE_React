import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModelUser.scss'
import { useEffect, useState } from 'react';
import { fetchGroup, createUser } from '../services/userServices';
import { toast } from 'react-toastify';

//sử dụng lodash để copyy
import lodash from 'lodash'
function ModalDelete(props) {
    const [groupUser, setGroupUser] = useState([]);
    useEffect(() => {
        getGroups();
    }, [])
    const getGroups = async () => {
        let res = await fetchGroup();
        if (res && res.data && res.data.EC === 0) {
            setGroupUser(res.data.DT)
            // KT nếu có data và có mảng thì gán groups là data sau đó lấy tất cả data cũ, update
            // thêm group:groups[0].id để tránh khi validate ban đầu bị empty
            if (res.data.DT && res.data.DT.length > 0) {
                let groups = res.data.DT;
                setUserData({ ...userData, group: groups[0].id })
            }
        } else {
            toast.error(res.data.EM)
        }
    }
    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        address: '',
        password: '',
        sex: '',
        group: '',
    }
    const [userData, setUserData] = useState(defaultUserData);
    const valueValidDefault = {
        email: true,
        phone: true,
        password: true,
        username: true,
        address: true,
        gender: true,
        group: true,
    }
    const [isValidInput, setIsValidInput] = useState(valueValidDefault);

    const handleOnChange = async (value, name) => {
        // Coppy mảng ban đầu cho _userData vì reactjs kh hổ trợ state ban đầu
        let _userData = lodash.cloneDeep(userData);
        // gán _userData name = value nhập vào
        // Ví dụ: _userData[email]=email@gmail.com
        // Ví dụ: _userData[phone]=0898151737
        _userData[name] = value;
        // SetUserData -> lưu state
        setUserData(_userData);
    }
    const handleValidateInput = () => {
        setIsValidInput(valueValidDefault)
        let arr = ['email', 'phone', 'password', 'group'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            console.log(userData[arr[i]]);
            if (!userData[arr[i]]) {
                let _validInput = lodash.cloneDeep(valueValidDefault);
                _validInput[arr[i]] = false;
                setIsValidInput(_validInput);
                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    }
    const handleConfirm = async () => {
        let check = handleValidateInput();
        if (check === true) {
            let res = await createUser({ ...userData, groupId: userData['group'] });
            if (res && res.data.EC === 0) {
                toast.success(res.data.EM);
                props.onHide();
                setUserData({ ...defaultUserData, group: groupUser[0].id })
            } else {
                toast.error(res.data.EM);
            }
        }
    }
    return (
        <>
            <Modal size="lg" className='modal-user'
                show={props.show} onHide={props.onHide} >
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='form-group col-sm-6 col-12'>
                            <label>Email address (<span className='red'>*</span>) :</label>
                            <input
                                className={isValidInput.email ? 'form-control' : 'form-control is-invalid'}
                                type='email'
                                value={userData.email}
                                onChange={(e) => handleOnChange(e.target.value, 'email')}
                            />
                        </div>
                        <div className='form-group col-sm-6 col-12'>
                            <label>Phone number (<span className='red'>*</span>) :</label>
                            <input
                                className={isValidInput.phone ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={userData.phone}
                                onChange={(e) => handleOnChange(e.target.value, 'phone')}
                            />
                        </div>
                        <div className='form-group col-12 col-sm-6'>
                            <label>Password (<span className='red'>*</span>) :</label>
                            <input
                                className={isValidInput.password ? 'form-control' : 'form-control is-invalid'}
                                type='password'
                                value={userData.password}
                                onChange={(e) => handleOnChange(e.target.value, 'password')}
                            />
                        </div>
                        <div className='form-group col-12 col-sm-6'>
                            <label>Username (<span className='red'>*</span>) :</label>
                            <input className={isValidInput.username ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={userData.username}
                                onChange={(e) => handleOnChange(e.target.value, 'username')}
                            />
                        </div>
                        <div className='form-group col-12 col-6'>
                            <label>Address (<span className='red'>*</span>) :</label>
                            <input
                                className={isValidInput.address ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={userData.address}
                                onChange={(e) => handleOnChange(e.target.value, 'address')}
                            />
                        </div>
                        <div className='form-group col-12 col-sm-6'>
                            <label>Gender (<span className='red'>*</span>) :</label>
                            <select
                                className='form-select form-group'
                                onChange={(e) => handleOnChange(e.target.value, 'sex')}
                            >
                                <option selected value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='form-group col-12 col-sm-6'>
                            <label>Group (<span className='red'>*</span>) :</label>
                            <select
                                className={isValidInput.group ? 'form-select' : 'form-select is-invalid'}
                                onChange={(e) => handleOnChange(e.target.value, 'group')}
                            >
                                {groupUser.length > 0 && groupUser.map((item, index) => {
                                    return (
                                        <option key={`groups-${index}`} value={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirm()} >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;