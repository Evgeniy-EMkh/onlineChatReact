import { useDispatch, useSelector } from "react-redux";
import { setName, toggleCheckbox } from "../../store/profile/actions";
import { selectName, selectShowName } from "../../store/profile/selectors";
import { Form } from "../Form/Form";

export const Profile = () => {
    const dispatch = useDispatch();
    const name = useSelector(selectName);
    const showName = useSelector(selectShowName);
    const handleClick = () => {
        dispatch(toggleCheckbox);
    };

    const handleSubmit = (text) => {
        dispatch(setName(text));
    };

    return (
        <>
            <h3>Profile</h3>
            {showName && < span > {name}</span>}
            <button onClick={handleClick}>change show Name</button>
            <Form onSubmit={handleSubmit} />
        </>
    );
};